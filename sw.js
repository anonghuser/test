console.log('in sw.js', location.href)

addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

addEventListener("fetch", (event) => {
  console.log('sw fetch', event);
});

addEventListener("message", (event) => {
  console.log('sw message', event);
});
