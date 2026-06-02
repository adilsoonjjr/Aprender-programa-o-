const CACHE = 'devquest-v6';

const BASE = self.registration.scope;

const ASSETS = [
  BASE,
  BASE + 'index.html',
  BASE + 'style.css',
  BASE + 'app.js',
  BASE + 'data/python.js',
  BASE + 'data/python-mercado.js',
  BASE + 'data/python-dados.js',
  BASE + 'data/python-analise.js',
  BASE + 'data/angular.js',
  BASE + 'data/angular-mercado.js',
  BASE + 'data/angular-fullstack.js',
  BASE + 'data/spring.js',
  BASE + 'data/spring-mercado.js',
  BASE + 'data/spring-fullstack.js',
  BASE + 'data/sql.js',
  BASE + 'data/powerbi.js',
  BASE + 'data/excel.js',
  BASE + 'data/git.js',
  BASE + 'data/conceitos.js',
  BASE + 'icons/icon.svg',
  BASE + 'manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match(BASE + 'index.html')))
  );
});
