console.log('in sw.js', location.href)

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});
