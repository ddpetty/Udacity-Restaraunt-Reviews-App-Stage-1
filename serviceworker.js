(() => {
  const CACHE_NAME = 'app-cache-v1',
    PATHS = [
      '/',
      '/index.html',
      '/restaurant.html',
      '/img/1.jpg',
      '/css/styles.css',
      '/js/main.js',
      '/js/dbhelper.js',
      '/js/restaurant_info.js',
      '/img/1.jpg',
      '/img/2.jpg',
      '/img/3.jpg',
      '/img/4.jpg',
      '/img/5.jpg',
      '/img/6.jpg',
      '/img/7.jpg',
      '/img/8.jpg',
      '/img/9.jpg',
      '/img/10.jpg',
    ];

  //On install - caching the application shell
  self.addEventListener('install', (event) => {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
      caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PATHS);
      })
    );
  });

  //Deletes old caches and updates with new cache
  self.addEventListener('activate', (event) => {
    console.log('Activating new service worker...');

    let cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((CACHE_NAME) => {
            if (cacheWhitelist.indexOf(CACHE_NAME) === -1) {
              return caches.delete(CACHE_NAME);
            }
          })
        );
      })
    );
  });
  //Tells service worker to fetch cache of static files when there is no network access
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
})();