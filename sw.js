// sw.js - SALINK Service Worker
const CACHE_NAME = 'salink-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/assets/css/tokens.css',
  '/assets/css/core.css',
  '/assets/css/theme.css',
  '/assets/css/utilities.css',
  '/assets/css/layout.css',
  '/assets/css/components.css',
  '/assets/css/citizen.css',
  '/assets/js/app.js',
  '/assets/js/router.js',
  '/assets/js/eventbus.js',
  '/assets/js/storage.js',
  '/assets/js/theme.js',
  '/assets/js/layout.js',
  '/assets/js/components.js',
  '/assets/js/data.js',
  '/manifest.json'
];

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate service worker
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

// Fetch from cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
