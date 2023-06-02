import { CIRCLES_URL } from "../constants";

export default class ElmBackground extends HTMLElement {
  constructor() {
    super();

    this._h_resize = (_) => {
      let size = {width: window.innerWidth, height: 416};
      let ibackground = document.getElementById("ibackground");
      ibackground.width = size.width;
      return ibackground.height = size.height
    };

    this._arguments = [
      "panel=false",
      "speed=50-100",
      "radius=1-5",
      "circles=50"
    ];

    this.init_elm()
  };

  connectedCallback() {
    window.addEventListener("resize", this._h_resize);
    this._h_resize.call()
  };

  disconnectedCallback() {
    window.removeEventListener("resize", this._h_resize)
  };

  init_elm(data) {
    let template = `${`\n      <iframe id='ibackground' src='${CIRCLES_URL}?${this._arguments.join("&")}' title='Circles'></iframe> \n    `}`;
    this.innerHTML = template
  }
}