
const CACHE_NAME = 'nautica-gym-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/inscribete.html',
  '/servicios.html',
  '/galeria.html',
  '/style.css',
  '/manifest.json',
  '/logo.png',
  '/gym0.jpeg',
  '/gym1.jpeg',
  '/gym2.jpeg',
  '/gym3.jpeg',
  '/icongym.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});