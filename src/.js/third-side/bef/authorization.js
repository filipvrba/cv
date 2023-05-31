import Net from "./net";
import { ENV } from "../../env";

export default class Authorization {
  get_github_access_token(code, callback) {
    let uri = `${ENV.VITE_URL_API}/github/access_token?client_id=${ENV.VITE_CLIENT_ID}&database=${ENV.VITE_DATABASE}&code=${code}&scope=${ENV.VITE_SCOPE}`;
    Net.get_json(uri, (data) => {if (callback) callback(data)})
  };

  get_json(url, github_result, callback) {
    fetch(
      url,
      {headers: {authorization: `${github_result.token_type} ${github_result.access_token}`}}
    ).then(response => response.json()).then((data) => {
      if (data.message) {
        console.error(`GET: ${data.message}`);
        if (callback) return callback([])
      } else if (callback) {
        return callback(data)
      }
    })
  };

  github_callback(callback) {
    let url_params = new URLSearchParams(location.search);
    let code = url_params.get("code");

    if (code) {
      authorization.get_github_access_token(code, (result) => {
        window.history.replaceState(null, null, "/");

        if (result.scope.indexOf(ENV.VITE_SCOPE) > -1) {
          sessionStorage.setItem("access_token", result.access_token);
          if (callback) callback(result)
        }
      })
    } else if (callback) {
      callback(null)
    }
  }
}