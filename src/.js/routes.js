import Route from "./core/route";
const ROUTES = {"404": PAGES.err_404, "/": PAGES.home};
new Route(ROUTES)