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
    const seenmap = new Map
    client.postMessage({type: 'z', data: JSON.parse(JSON.stringify(event, function (key, value) {
      const parentPath = seenmap.get(this) || []
      const path = [...parentPath, key]
      if (value && typeof value == 'object') {
        const seenPath = seenmap.get(value)
        if (seenPath) {
          const recursion = seenPath.join() == path.slice(0, seenPath.length).join()
          return `<${recursion ? 'recursion' : 'ref'}:${JSON.stringify(seenPath)}>`
        }

        const result = {}
        seenmap.set(value, path)
        seenmap.set(result, path)
        for (const key in value) result[key] = value[key]
        return result
      }
      return value
    }))})
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
