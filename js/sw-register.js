if ("serviceWorker" in navigator) {
	window.addEventListener("load", function() {
	  	navigator.serviceWorker
		    .register("/serviceworker.js")
	        .then(function() {
		        console.log("Pendaftaran ServiceWorker berhasil");
	        })
	        .catch(function() {
		        console.log("Pendaftaran ServiceWorker gagal");
	        });
	    });
	} else {
	    console.log("ServiceWorker belum didukung browser ini.");
	}

    if ('Notification' in window) {
	  Notification.requestPermission().then(function (result) {
	    if (result === "denied") {
	      console.log("Fitur notifikasi tidak diijinkan.");
	      return;
	    } else if (result === "default") {
	      console.error("Pengguna menutup kotak dialog permintaan ijin.");
	      return;
	    }
	    
	    if (('PushManager' in window)) {
		    navigator.serviceWorker.getRegistration().then(function(registration) {
		        registration.pushManager.subscribe({
		            userVisibleOnly: true,
		            applicationServerKey: urlBase64ToUint8Array("BCfuQND2eGKzrr-4nT2ZtlIWLg92IVTltSCZdkAITQnuyyaPyX69p6kNH0U_3Y-u1LIj-5HysTOyf1I81EG9Vqo")
		        }).then(function(subscribe) {
		            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
		            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
		                null, new Uint8Array(subscribe.getKey('p256dh')))));
		            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
		                null, new Uint8Array(subscribe.getKey('auth')))));
		        }).catch(function(e) {
		            console.error('Tidak dapat melakukan subscribe ', e.message);
		        });
		    });
		}
	  });
	}