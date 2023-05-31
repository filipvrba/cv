export default class ElmHome extends HTMLElement {
  constructor() {
    super();
    this._title = "CV";
    this.init_elm()
  };

  init_elm() {
    let template = `${`
      <div class='container py-5'>
        <div class='pricing-header p-3 pb-md-4 mx-auto text-center'>
          <h1 class='display-4 fw-normal'>${this._title}</h1>
        </div>

        <elm-greet></elm-greet>

        <div class='text-center pb-3 mb-4 pt-3 mt-4'>
          <h2>Articles</h2>
        </div>
        <elm-articles></elm-articles>

        <div class='text-center pb-3 mb-4 pt-3 mt-4'>
          <h2>Projects</h2>
        </div>
        <elm-projects></elm-projects>
      </div>
    `}`;
    this.innerHTML = template
  }
}