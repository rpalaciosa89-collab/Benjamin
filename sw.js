// Service Worker — Edgy Benji
// Cachea todos los archivos para juego offline

const CACHE_NAME = 'edgy-benji-v1';

const ARCHIVOS = [
  './',
  './index.html',
  './favicon.svg',
  './manifest.json',
  './robots.txt',
  './404.html',
  './assets/music-player.js',
  './assets/bg_music.mp3',
  './assets/Beat_It.mp3',
  './assets/Billie_Jean.mp3',
  './aritmi/index.html',
  './benji-al-rescate/index.html',
  './color-fun/index.html',
];

// Instalar: cachear todo
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ARCHIVOS);
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

// Fetch: servir desde cache, con fallback a red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((respuesta) => {
      return respuesta || fetch(event.request).then((res) => {
        // Cachear nuevos recursos dinámicamente
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return res;
      });
    }).catch(() => {
      // Fallback offline para navegación
      if (event.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
    })
  );
});
