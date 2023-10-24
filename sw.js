const controllerScope = new URL('fuse/', location)
const routes = [];
function addRoute(options, client) {
    routes.push({
        URLMatcher: new RegExp(options.url),
        type: options.type,
        controller: client.id
    })
}

importScripts(['jsonify.js'])





addEventListener("install", async (event) => {
    await skipWaiting();
});

addEventListener("activate", async (event) => {
    await clients.claim();
});

const activeStreams = []

addEventListener("fetch", event => {
    if (event.request.url.includes('fake')) {
        event.respondWith((async () => {
            const client = await clients.get(event.clientId)
            client.postMessage(JSONify({ type: 'fetch', data: event }, [globalThis]))
            const headers = new Headers({
                'trailers': 'x-wat',
                'x-lol': registration.scope,
            })
            headers.append('x-twat', 'mmh')
            const stream = new ReadableStream({
                async start(controller) {
                    controller.enqueue(Uint8Array.from([69, 70, 71]))
                    await new Promise(r => setTimeout(r, 1000))
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
