/*
COLORS
03045e  ||  indigo darken-4 / 1a237e
0077b6
00b4d8	2d2d2a
90e0ef	ede7e3
caf0f8	ffa62b
*/

document.addEventListener("DOMContentLoaded", function(){
	const nav = document.querySelectorAll(".sidenav");
	M.Sidenav.init(nav);
	loadNavigation(); 

	function loadNavigation(){
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if(this.readyState === 4){
				if(this.status !== 200) return;
				//load menu
				document.querySelectorAll(".topnav, .sidenav").forEach(function(elm){
					elm.innerHTML = xhttp.responseText;
				});

				//register menus event
				document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
		        	elm.addEventListener("click", function(event) {
		        	//close
		          		const sidenav = document.querySelector(".sidenav");
		          		M.Sidenav.getInstance(sidenav).close();
		 				//load content
		          		page = event.target.getAttribute("href").substr(1);
		          		loadPage(page);
		        	});
		      	});
			}
		};
		xhttp.open("GET", "nav.html", true);
		xhttp.send();
	}

	var page = window.location.hash.substr(1);
	if (page === "") page = "home";
	loadPage(page);
	
	function loadPage(page) {
	  let xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
	  	const content = document.querySelector("#body-content");
	    if (this.readyState === 4) {
	      	switch(page) {
                case "home": getStandings(); break;
                case "schedule": getSchedule(); break;
                case "saved": getSavedTeams(); break;
           	}
	      	if (this.status === 200) {
	        	content.innerHTML = xhttp.responseText;
	      	} else if (this.status === 404) {
	        	content.innerHTML = "<p>Page Not Found.</p>";
	      	} else {
	        	content.innerHTML = "<p>Access Denied.</p>";
	      	}
	    }
	  };
	  xhttp.open("GET", "pages/" + page + ".html", true);
	  xhttp.send();
	}
});