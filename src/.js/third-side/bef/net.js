import { ENV } from "../../env";

export default class Net {
  static get_json(url, callback) {
    fetch(url).then(response => response.json()).then((data) => {
      if (data.status_code) {
        console.error(`GET: ${data.status_code} ${data.status}`);
        if (callback) return callback([])
      } else if (callback) {
        return callback(data)
      }
    })
  };

  static send(method, query, callback) {
    method = method.toUpperCase();

    fetch(ENV.VITE_URL_API, {method, headers: {
      Token: ENV.VITE_BEF_SERVER,
      Database: ENV.VITE_DATABASE,
      Query: query
    }}).then(response => response.json()).then((data) => {
      if (data.status_code == 403 || data.status_code == 405 || data.status == Net.SQL_ERR) {
        console.error(`${method}: ${data.status_code} ${data.status}`);
        if (callback) return callback(false)
      } else if (callback) {
        return callback(true)
      }
    })
  }
};

Net.SQL_ERR = "SQL Error"