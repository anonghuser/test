addEventListener("install", async (event) => {
  await skipWaiting();
});

addEventListener("activate", async (event) => {
  await clients.claim();
});

const activeStreams = []

addEventListener("fetch", async (event) => {
  if (event.request.url.includes('fake')) {
    const client = await clients.get(event.clientId)
    let cnt = 0
    client.postMessage({type: 'z', data: JSON.parse(JSON.stringify(event, (_, value) => {
      if (cnt++ > 1000) return '???'
      if (typeof value == 'object') {
        const result = {}
        for (const key in value) result[key] = value[key]
        return result
      }
      return value
    }, 2))})
    return
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
