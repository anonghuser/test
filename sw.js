console.log('in sw.js', location.href)

addEventListener("install", (event) => {
  skipWaiting();
});

addEventListener("activate", (event) => {
  clients.claim();
  registration.unregister();
});

addEventListener("fetch", (event) => {
  console.log('sw fetch', event.request.url);
  if (event.request.url.startsWith('https://fake')) {
    event.respondWith(new Response(new Blob(['zzz'], {type: 'text/plain'})))
  }
});

addEventListener("message", (event) => {
  console.log('sw message', event);
});
