var dbPromised = idb.open("team-list", 1, function(upgradeDb) {
  var teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("team_id", "id", { unique: false });
});

function saveForLater(team) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(function() {
    	M.toast({html: 'Data berhaisl disimpan', classes: 'rounded'});
      	console.log("Detail tim berhasil di simpan.");
    });
}

function getById(id){
	return new Promise(function(resolve, reject){
		dbPromised
			.then(function(db){
				var tx = db.transaction("teams", "readonly");
			    var store = tx.objectStore("teams");
			    return store.get(parseInt(id));
			})
			.then(function(team){
				if(team !== undefined){
					resolve(team)
				}else{
					reject(new Error())
				}
			})
	})
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

function deleteTeam(team){
	dbPromised.then(function(db) {
	  var tx = db.transaction('teams', 'readwrite');
	  var store = tx.objectStore('teams');
	  store.delete(team);
	  return tx.complete;
	}).then(function() {
	  console.log('Item deleted');
	  M.toast({html: 'Data Deleted', classes: 'rounded'});
	  window.location.href = "/index.html";
	});
}