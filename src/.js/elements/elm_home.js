import { GITHUB_URL } from "../constants";
import Net from "../core/net";

export default class ElmHome extends HTMLElement {
  constructor() {
    super();
    this.get_data(data => this.init_elm(data))
  };

  get_data(block) {
    Net.http_get(GITHUB_URL.profile, (profile) => {
      let data = {
        avatar: profile.avatar_url,
        full_name: profile.name,
        profile_url: profile.html_url
      };

      if (block) block(data)
    })
  };

  init_elm(data) {
    let template = `${`
      <div class='container py-5'>
        <div class='text-center'>
          <a href='${data.profile_url}' target='_blank' style='color: inherit;'>
            <img src='${data.avatar}' class='bd-placeholder-img rounded-circle mb-3 mt-3' width='256' height='256' />
            <h1 class='display-1 m-0'><strong>${data.full_name}</strong></h1>
          </a>
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