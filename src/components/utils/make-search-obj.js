const uriSpace = new RegExp('%20|\\+', 'g')
const quots = /'|"/g
export const makeSearchObj = (string) => {
    const out = {}
    const passedString = String(decodeURIComponent(string).replace(uriSpace, '__').replace(quots, ''))

    passedString.split('&').forEach((item) => {
        const parts = String(item).split('=')
        if (parts[1]) {
            out[parts[0]] = parts[1] || ''
        }
    })
    return out
}
