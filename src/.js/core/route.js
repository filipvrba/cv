export default class Route {
  constructor(routes) {
    this._routes = routes;
    window.onpopstate = this.location.bind(this);
    window.route = this.route.bind(this);
    this.location()
  };

  route(event) {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    this.location()
  };

  location() {
    let path = window.location.pathname;
    let html = this._routes[path] || this._routes[404];
    document.getElementById("app").innerHTML = html
  }
}