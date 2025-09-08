self.addEventListener('install', (event) => {
  self.skipWaiting()
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
      caches.open('abyk-static-v1').then(async (cache) => {
        const cached = await cache.match(req)
        if (cached) return cached
        try {
          const res = await fetch(req)
          if (req.method === 'GET' && res.status === 200) {
            cache.put(req, res.clone())
          }
          return res
        } catch (e) {
          return cached || Response.error()
        }
      })
    )
  }
})
