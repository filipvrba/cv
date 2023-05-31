export default class Net {
  static http_get(url, callback) {
    fetch(url).then(response => response.json()).then((data) => {
      if (data.status_code) {
        console.error(`GET: ${data.status_code} ${data.status}`);
        if (callback) return callback([])
      } else if (callback) {
        return callback(data)
      }
    })
  }
}