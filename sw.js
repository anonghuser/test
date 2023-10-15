console.log('in sw.js', location.href, registration.scope)

addEventListener("install", async (event) => {
  console.log('in sw.js', 'install')
  await skipWaiting();
  console.log('in sw.js', 'skipWaiting done')
});

addEventListener("activate", async (event) => {
  console.log('in sw.js', 'activate')
  await clients.claim();
  console.log('in sw.js', 'claim done')
  await registration.unregister();
  console.log('in sw.js', 'unregister done')
});

addEventListener("fetch", (event) => {
  console.log('sw fetch', event.request.url);
  if (event.request.url.includes('redirect')) {
    event.respondWith(new Response(null, {
      status: 302,
      statusText: 'Teapot go there',
      headers: {
        location: registration.scope,
      },
    }))
  }
  else if (event.request.url.includes('proxy')) {
    event.respondWith(fetch(registration.scope));
  }
});

addEventListener("message", (event) => {
  console.log('sw message', event);
});
