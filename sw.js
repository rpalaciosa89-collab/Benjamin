// Service Worker — Edgy Benji
// Precachea archivos esenciales. Los MP3 se cachean bajo demanda.

const CACHE_NAME = 'edgy-benji-v19';

// Solo archivos pequeños/esenciales — NADA de MP3 aquí
const PRECACHE = [
  './',
  './index.html',
  './favicon.svg',
  './manifest.json',
  './robots.txt',
  './404.html',
  './assets/music-player.js',
  './assets/user-system.js',
  './assets/audio-fx.js',
  './assets/motivational-voices.js',
  './aritmi/index.html',
  './benji-al-rescate/index.html',
  './color-fun/index.html',
  './magic-abc/letter-paths.js',
  './magic-abc/index.html',
];

// Instalar: precachear solo esenciales (sin MP3s)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        PRECACHE.map((url) =>
          cache.add(url).catch((err) => {
            console.warn('SW: no se pudo cachear', url, err);
          })
        )
      );
    })
  );
  self.skipWaiting();
});

// Activar: limpiar caches viejos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch: cache primero, red como fallback. MP3s se cachean al usarse.
self.addEventListener('fetch', (event) => {
  // No cachear requests a Google Fonts ni analytics
  if (event.request.url.includes('googleapis') || event.request.url.includes('gstatic')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((respuesta) => {
      return respuesta || fetch(event.request).then((res) => {
        // Cachear dinamicamente (HTML, JS, MP3s, etc.)
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return res;
      });
    }).catch(() => {
      // Fallback offline: si es navegacion, servir index.html
      if (event.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
    })
  );
});
