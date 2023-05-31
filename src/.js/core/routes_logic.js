function route(event) {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  location()
};

async function location() {
  let path = window.location.pathname;
  let route = ROUTES[path] || ROUTES["404"];
  document.getElementById("app").innerHTML = route
};

window.onpopstate = location;
window.route = route;
location()