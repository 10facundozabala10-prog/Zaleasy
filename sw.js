const CACHE_VERSION = 'zaleasy-shell-20260813-v10';
const OFFLINE_URL = './offline.html';
const CORE_ASSETS = [
  './',
  './index.html',
  './app.html',
  './blog.html',
  './offline.html',
  './manifest.webmanifest',
  './styles.css',
  './landing.css',
  './app.js',
  './article-reader.js',
  './pwa.js',
  './assets/logo-navbar.png',
  './assets/pwa-icon-192.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith('zaleasy-shell-') && key !== CACHE_VERSION).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

const cacheResponse = async (request, response) => {
  if (!response || !response.ok || response.type === 'opaque') return response;
  const cache = await caches.open(CACHE_VERSION);
  await cache.put(request, response.clone());
  return response;
};

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => cacheResponse(request, response))
        .catch(async () => (await caches.match(request)) || (await caches.match(OFFLINE_URL)))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request)
        .then(response => cacheResponse(request, response))
        .catch(() => cached);
      return cached || network;
    })
  );
});
