function JSONify(root, skip = []) {
    const seenmap = new Map
    return JSON.parse(JSON.stringify(root, function (key, value) {
        const path = value === root ? [] : [...seenmap.get(this), key]
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
