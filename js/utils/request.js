export function http_get(url) {
    return new Promise(function(resolve, reject) {
        const options = {
            method: 'GET',
            mode: 'cors',
        }
        fetch(url, options).then(resp => {
            resp.json().then(resolve)
        })
    })

}