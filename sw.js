console.log('in sw.js', location.href)

addEventListener("activate", (event) => {
  const claim = clients.claim();
  event.waitUntil(claim);
  claim.then(()=>registration.unregister());
});

addEventListener("fetch", (event) => {
  console.log('sw fetch', event);
});

addEventListener("message", (event) => {
  console.log('sw message', event);
});
