const CACHE = 'bbconcurso-v4';
const BASE = self.registration.scope;
const ASSETS = [
  BASE,
  BASE + 'index.html',
  BASE + 'style.css',
  BASE + 'app.js',
  BASE + 'data/portugues.js',
  BASE + 'data/matematica.js',
  BASE + 'data/bancario.js',
  BASE + 'data/informatica.js',
  BASE + 'data/atualidades.js',
  BASE + 'data/legislacao.js',
  BASE + 'data/vendas.js',
  BASE + 'data/videos.js',
  BASE + 'manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseClone = response.clone();
        caches.open(CACHE).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(() => {
        if (event.request.destination === 'document') {
          return caches.match(BASE + 'index.html');
        }
      });
    })
  );
});
