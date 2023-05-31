import Net from "./net";
import { ENV } from "../../env";

export default class Database {
  constructor(name) {
    this._name = name
  };

  query(query, callback) {
    let is_set = this.set(query, (data) => {
      if (callback) callback(data)
    });

    if (!is_set) this.get(query, (data) => {if (callback) callback(data)})
  };

  get(query, callback) {
    let query_encode = encodeURIComponent(query);
    let uri = `${ENV.VITE_URL_API}?token=${ENV.VITE_BEF_CLIENT}&database=${ENV.VITE_DATABASE}&query=${query_encode}`;
    Net.get_json(uri, (data) => {if (callback) callback(data)})
  };

  set(query, callback) {
    let is_active = false;
    let low_query = query.toLowerCase();

    if (low_query.indexOf("insert into") > -1 || low_query.indexOf("create table") > -1) {
      is_active = true;
      Net.send("post", query, (data) => {if (callback) callback(data)})
    } else if (low_query.indexOf("delete") > -1) {
      is_active = true;
      Net.send("delete", query, (data) => {if (callback) callback(data)})
    } else if (low_query.indexOf("update") > -1) {
      is_active = true;
      Net.send("patch", query, (data) => {if (callback) callback(data)})
    };

    return is_active
  }
}