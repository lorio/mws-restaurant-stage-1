var staticCache = 'restaurants-v1';

self.addEventListener('install', function(event) {

  event.waitUntil(
    caches.open(staticCache).then(function(cache) {
      //activate
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/data/restaurants.json',
        '/js/restaurant_info.js',
        '/js/dbhelper.js',
        '/js/main.js',
        '/css/normalize.css',
        '/css/styles.css',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg'
      ]);
    })
  );
});
//Fetch and serve opened cache 
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if(response !== undefined) {
        return response;
        } else {
           return fetch(event.request).then(function (response) {
            //cache a copy of it
            let responseClone = response.clone();
            caches.open(staticCache).then(function (cache){
              cache.put(event.request, responseClone);
            });
          return response;
          //catch error
        }).catch(function () {
          console.log('Nothing to show');
        });
      }
   }));
});

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});