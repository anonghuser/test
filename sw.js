const id = Math.ceil(Math.random()*1000) + '-' + Date.now();
console.log('in sw.js', id, location.href, registration.scope)

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
  else if (event.request.url.includes('getswid')) {
    const response = new Response(new Blob([id]));
    Object.defineProperty(response, 'url', {value: 'https://funwithserviceworkers.com/getswid'});
    event.respondWith(response);
  }
});

addEventListener("message", (event) => {
  console.log('sw message', event);
});
