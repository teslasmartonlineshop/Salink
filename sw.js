// SALINK Service Worker v1.0
const CACHE_NAME = 'salink-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/icons/icon-72.png',
  '/assets/icons/icon-96.png',
  '/assets/icons/icon-128.png',
  '/assets/icons/icon-144.png',
  '/assets/icons/icon-152.png',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-384.png',
  '/assets/icons/icon-512.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching assets...');
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

// Fetch from cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response or fetch from network
        return response || fetch(event.request).catch(() => {
          // Offline fallback
          return caches.match('/index.html');
        });
      })
  );
});
