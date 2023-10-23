addEventListener("install", async (event) => {
  await skipWaiting();
});

addEventListener("activate", async (event) => {
  await clients.claim();
});

const activeStreams = []

addEventListener("fetch", async (event) => {
  const client = clients.get(event.clientId)
  client.postMessage({type: 'z', data: event})
  return
  if (event.request.url.includes('fake')) {
    const stream = new ReadableStream({
      start(controller) {

      }
    })
    event.respondWith(new Response(null, {
      status: 302,
      statusText: 'Teapot go there',
      headers: {
        location: registration.scope,
      },
    }))
  }
});

addEventListener("message", (event) => {
  console.log('sw message', event);
});
