// Minimal service worker – caches the app shell for offline use
const CACHE_NAME = 'aetherium-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  // add any other assets you want to cache, e.g. quotes.json
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
