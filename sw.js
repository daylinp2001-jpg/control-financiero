const offline = new URL('offline.html', self.registration.scope).href;
self.addEventListener('install', event => {
  event.waitUntil(caches.open('control-financiero-pages-v1').then(cache => cache.add(offline)));
});
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate' && event.request.url.startsWith(self.registration.scope)) {
    event.respondWith(fetch(event.request).catch(() => caches.match(offline)));
  }
});
