console.log('in sw.js', location.href)

addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
  registration.unregister();
});

addEventListener("fetch", (event) => {
  console.log('sw fetch', event);
});

addEventListener("message", (event) => {
  console.log('sw message', event);
});
