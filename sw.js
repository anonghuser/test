addEventListener("install", async (event) => {
  await skipWaiting();
});

addEventListener("activate", async (event) => {
  await clients.claim();
});

function JSONify(root, skip = []) {
  const seenmap = new Map
  return JSON.parse(JSON.stringify(root, function (key, value) {
    const path = value===root ? [] : [...seenmap.get(this), key]
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

addEventListener("fetch", event => {
  if (event.request.url.includes('fake')) {
    event.respondWith((async () => {
      const client = await clients.get(event.clientId)
      client.postMessage(JSONify({type: 'fetch', data: event}, [globalThis]))
      const headers = new Headers({
        'trailers':'x-wat',
        'x-lol': registration.scope,
      })
      headers.append('x-twat', 'mmh')
      const stream = new ReadableStream({
        async start(controller) {
          controller.enqueue(Uint8Array.from([69, 70, 71]))
          await new Promise(r=>setTimeout(r, 1000))
          controller.enqueue(Uint8Array.from([69, 70, 71]))
          headers.append('x-wat', 'hmm')
          controller.close()
        }
      })
      return new Response(stream, {
        status: 222,
        statusText: 'Teapot go there',
        headers,
      })
    })())
  }
});

addEventListener("message", (event) => {
  console.log('sw message', event);
});
