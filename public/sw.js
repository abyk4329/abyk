const CACHE_NAME = 'abyk-static-v1';
const APP_SHELL_URLS = [
  '/',
  // You can add other essential assets for the app shell here
  // For example: '/styles/main.css', '/scripts/main.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL_URLS);
    })
  );
  self.skipWaiting();
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  // Network-first for HTML, cache-first for others
  if (req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req).catch(() => caches.match('/'))
    )
  } else {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(req)
        try {
          const res = await fetch(req)
          if (req.method === 'GET' && res.status === 200) {
            cache.put(req, res.clone())
          }
          return res
        } catch {
          return cached || Response.error()
        }
      })
    )
  }
})
