const base_url = "https://api.football-data.org/v2/";
const api_key = "aca1920671614916802c27bf1e75c23a";
const standing_endpoint = `${base_url}competitions/2021/standings?standingType=TOTAL`;
const matches_endpoint = `${base_url}competitions/PL/matches?status=SCHEDULED`
// Blok kode yang akan di panggil jika fetch berhasil

function status(response) {
  if (response.status !== 200) {
    // M.toast({html: 'Error : '+error, classes: 'rounded'});
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Parsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  //M.toast({html: 'Error : '+error, classes: 'rounded'});
  console.log("Error : " + error);
}

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': api_key
        }
    })
        .then(status)
        .then(json)
        .catch(error)
};

function generateRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const load = document.getElementById("loading_gif");

function getStandings(){
  load.setAttribute("class", "hide");
  if('caches' in window){
    caches.match(standing_endpoint)
    .then(function(response){
      if(response){
        response.json().then(function(data){
          console.log("getStandings" + data);
          standingData(data);
        })
      }
    })
  }

  fetchAPI(standing_endpoint)
  .then(data=>{
    standingData(data);
  })
  .catch(error=>{
    console.log(error);
    //M.toast({html: 'Error : '+error, classes: 'rounded'});
  })
  
}

function standingData(data){
  var elmstandingsHTML = "";
  data.standings.forEach(function(standings){
    var elmstandings = "";
    standings.table.forEach(function(standing){
      standing = JSON.parse(JSON.stringify(standing).replace(/http:/g, 'https:'));

      elmstandings += `
        <tr>
                <div class="card" >
                
                <td class="center-align">${standing.position}</td>
                    
                    <td >
                    <a href="./team-details.html?id=${standing.team.id}">
                    <p class="hide-on-small-only">
                    <img class = "show-on-medium-and-up show-on-medium-and-down" src=${standing.team.crestUrl}  alt="Team Logo" width="50">
                   
                    </p>
                    <p class="hide-on-med-and-up show-on-medium-and-down">
                    <img src=${standing.team.crestUrl} alt="Logo Team" width="20px">
                    </p>
                    </a>
                    </td>
                    <td>
                    <a href="./team-details.html?id=${standing.team.id}">${standing.team.name} </a>
                    </td>
                    <td class="center-align">${standing.won}</td>
                    <td class="center-align">${standing.draw}</td>
                    <td class="center-align">${standing.lost}</td>
                    <td class="center-align">${standing.points}</td>
                    <td class="center-align">${standing.goalsFor}</td>
                    <td class="center-align">${standing.goalsAgainst}</td>
                    <td class="center-align">${standing.goalDifference}</td>
                    </div>
                </tr>
      `
    })

    elmstandingsHTML += `
      <div class="card" >
                <div class="card-content">
                
                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th class="center-align">Position</th>
                            <th class="center-align">Team Name</th>
                            <th></th>
                            <th class="center-align">Wins</th>
                            <th class="center-align">Draws</th>
                            <th class="center-align">Loses</th>
                            <th class="center-align">Point</th>
                            <th class="center-align">Goals For</th>
                            <th class="center-align">Goals Against</th>
                            <th class="center-align">Goals Difference</th>
                        </tr>
                     </thead>
                    <tbody id="pertandingan">` + elmstandings+ `</tbody>
                </table>
                </div>
                </div>
    `
  })
  document.getElementById("teamsList").innerHTML= elmstandingsHTML;
}

function getTeamId(){
  return new Promise(function(resolve, reject){
    var urlParams = new URLSearchParams(window.location.search);
    var teamId = urlParams.get("id");
    load.setAttribute("class", "hide");
    if("caches" in window){
      caches.match(base_url+"teams/"+teamId)
      .then(function(response){
        if(response){
          response.json().then(function(data){
            teamData(data);
            resolve(data);
          })
        }
      })
    }
    fetchAPI(base_url+"teams/"+teamId)
    .then(data=>{
      teamData(data);
      resolve(data);
    })
    .catch(error=>{
      console.log(error);
      //M.toast({html: 'Error : '+error, classes: 'rounded'});
    })
  })  
}

function teamData(data){
  data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));
  let teamHTML = `
    <div class="card">
      <div class="card-image">
        <a href="team-details.html?id=${data.id}">
          <img src="${data.crestUrl}">
          <span class="card-title deep-orange-text">${data.name}</span>
        </a>
      </div>
      <div class="card-content">
        <table class="responsive-table highlight">
            <tr>
              <td>Name</td>
              <td>${data.name}</td>
            </tr>
            <tr>
              <td>Short Name</td>
              <td>${data.shortName}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>${data.address}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>${data.phone}</td>
            </tr>
            <tr>
              <td>Website</td>
              <td><a href="${data.website}>${data.website}</a>"</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>${data.email}</td>
            </tr>
            <tr>
              <td>Venue</td>
              <td>${data.venue}</td>
            </tr>
          </table>
      </div>
    </div>        
      `;
      document.getElementById("body-content").innerHTML = teamHTML;
}

function getSavedTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    var teamsHTML = "";
    teams.forEach(function(team) {
      teamsHTML += `
    <div class="card">
      <div class="card-image">
        <a href="team-details.html?id=${team.id}&saved=true">
          <img src="${team.crestUrl}">
          <span class="card-title deep-orange-text">${team.name}</span>
        </a>
      </div>
      <div class="card-content">
        <table class="responsive-table highlight">
            <tr>
              <td>Name</td>
              <td>${team.name}</td>
            </tr>
            <tr>
              <td>Short Name</td>
              <td>${team.shortName}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>${team.address}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>${team.phone}</td>
            </tr>
            <tr>
              <td>Website</td>
              <td><a href="${team.website}>${team.website}</a>"</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>${team.email}</td>
            </tr>
            <tr>
              <td>Venue</td>
              <td>${team.venue}</td>
            </tr>
          </table>
      </div>
    </div>        
      `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = teamsHTML;
  });
}

function getSavedTeamsId(){
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  getById(idParam).then(function(team) {
    var teamsHTML = `
    <div class="card">
      <div class="card-image">
        <a href="team-details.html?id=${team.id}&saved=true">
          <img src="${team.crestUrl}">
          <span class="card-title deep-orange-text">${team.name}</span>
        </a>
      </div>
      <div class="card-content">
        <table class="responsive-table highlight">
            <tr>
              <td>Name</td>
              <td>${team.name}</td>
            </tr>
            <tr>
              <td>Short Name</td>
              <td>${team.shortName}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>${team.address}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>${team.phone}</td>
            </tr>
            <tr>
              <td>Website</td>
              <td><a href="${team.website}>${team.website}</a>"</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>${team.email}</td>
            </tr>
            <tr>
              <td>Venue</td>
              <td>${team.venue}</td>
            </tr>
          </table>
      </div>
    </div>        
      `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamsHTML;
  });
}
function getSchedule(){
  load.setAttribute("class", "hide");
  if("caches" in window){
    caches.match(matches_endpoint)
    .then(function(response){
      if(response){
        response.json().then(function(data){
          console.log("getSchedule" + data);
          matchData(data);
        })
      }
    })
  }

  fetchAPI(matches_endpoint)
  .then(data=>{
    matchData(data);
  })
  .catch(error=>{
    console.log(error);
    //M.toast({html: 'Error : '+error, classes: 'rounded'});
  })
  
}

function matchData(data){
  var matchHTML = "";
  data.matches.forEach(function(matches){
      matchHTML += `
          <div class="col s12 m6">
            <div class="card deep-orange darken-1">
              <div class="card-content white-text">
                <table class="centered">
                  <tr>
                    <td colspan="3"><h5>Match ID: ${matches.id}</h5></td>
                  </tr>
                  <tr>
                    <td>Home<br>${matches.homeTeam.name}</td>
                    <td>VS</td>
                    <td>Away<br>${matches.awayTeam.name}</td>
                  </tr>
                  <tr>
                    <td colspan="3">${matches.utcDate}<br>Match Day: ${matches.matchday}<br>${matches.stage}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
    `   
  })
  document.getElementById("matchList").innerHTML= matchHTML;
}
