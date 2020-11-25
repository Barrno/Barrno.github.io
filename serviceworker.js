importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log("Workbox installed");
else
    console.log("Workbox did not installed");

workbox.precaching.precacheAndRoute([
    {url: "/index.html", revision:"1"},
    {url: "/nav.html", revision:"1"},
    {url: "/team-details.html", revision:"2"},
    {url: "/manifest.json", revision:"1"},
    {url: "/logo.png", revision:"1"},
    {url: "/load-.gif", revision:"1"},
    {url: "/css/materialize.min.css", revision:"1"},
    {url: "/js/data-api.js", revision:"2"},
    {url: "/js/db.js", revision:"1"},
    {url: "/js/helpers.js", revision:"1"},
    {url: "/js/idb.js", revision:"1"},
    {url: "/js/jquery.min.js", revision:"1"},
    {url: "/js/main.js", revision:"1"},
    {url: "/js/materialize.min.js", revision:"1"},
    {url: "/js/sw-register.js", revision:"1"},
  ],
    {
      ignoreUrlParametersMatching: [/.*/]
    }
  );

workbox.routing.registerRoute(
    new RegExp("/pages"),
      workbox.strategies.staleWhileRevalidate({
        cacheName: "pages"
      })
  );

workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2/"),
        workbox.strategies.staleWhileRevalidate({
            cacheName: "API_URL"
        })
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: "google-fonts-stylesheets"
    })
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);
/*
const CACHE_NAME = "submission2_1";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/team-details.html",
  "/manifest.json",
  "/logo.png",
  "/pages/home.html",
  "/pages/schedule.html",
  "/pages/saved.html",
  "/css/materialize.min.css",
  "/js/data-api.js",
  "/js/idb.js",
  "/js/db.js",
  "/js/helpers.js",
  "/js/jquery.min.js",
  "/js/main.js",
  "/js/materialize.min.js",
  "/js/sw-register.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
];
 
 //Install Cache
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});


//Load Cache
self.addEventListener("fetch", function(event) {
    const base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {ignoreSearch: true}).then(function(response) {
                return response || fetch (event.request);
            })
        )
    }
});

//Delete Cache
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});*/

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: 'logo.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });