addEventListener("install", async (event) => {
  await skipWaiting();
});

addEventListener("activate", async (event) => {
  await clients.claim();
});

function JSONify(value, skip = []) {
  const seenmap = new Map
  return JSON.parse(JSON.stringify(value, function (key, value) {
    const parentPath = this ? seenmap.get(this) : []
    const path = [...parentPath||[], key]
    if (value && typeof value == 'object') {
      if (skip.includes(value)) return `<skip>`
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
  }))
}

const activeStreams = []

addEventListener("fetch", async (event) => {
  if (event.request.url.includes('fake')) {
    const client = await clients.get(event.clientId)
    client.postMessage({type: 'z', data: JSONify(event, [globalThis])})
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
