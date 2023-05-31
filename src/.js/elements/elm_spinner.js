export default class ElmSpinner extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = this.init_html()
  };

  init_html() {
    let template = `${`
    <div class='d-flex justify-content-center'>
      <div class='spinner-border' role='status'>
        <span class='visually-hidden'>Loading...</span>
      </div>
    </div>
    `}`;
    return template
  }
}