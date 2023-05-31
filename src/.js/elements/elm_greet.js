import { EVENTS, GITHUB_URL } from "../constants";
import Net from "../core/net";
import Events from "../events";

export default class ElmGreet extends HTMLElement {
  constructor() {
    super();
    this._h_elm_projects_length = e => this.init_count_projects(e.detail);
    this._h_elm_articles_length = e => this.init_count_articles(e.detail);
    this.init_spinner();

    this.get_data((data) => {
      this.init_elm(data);
      Events.send(EVENTS.elm_greet_loaded)
    })
  };

  connectedCallback() {
    document.addEventListener(
      EVENTS.elm_projects_length,
      this._h_elm_projects_length
    );

    document.addEventListener(
      EVENTS.elm_articles_length,
      this._h_elm_articles_length
    )
  };

  disconnectedCallback() {
    document.removeEventListener(
      EVENTS.elm_projects_length,
      this._h_elm_projects_length
    );

    document.removeEventListener(
      EVENTS.elm_articles_length,
      this._h_elm_articles_length
    )
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
      <div class='row justify-content-center pb-3 mb-4 pt-3 mt-4'>
        <div class='col-lg-6'>
          <p class='h1 m-0'>Resources for a CV With More Clarity</p>
          <a href='${data.profile_url}' target='_blank' style='color: inherit;'>
            <ul class='nav list-unstyled d-flex align-items-center'>
              <li class='ms-3'>
                <img src='${data.avatar}' class='rounded d-block mb-3 mt-3' width='50' height='50' />
              </li>
              <li class='ms-3'>
                <p class='m-0'><strong>${data.full_name}</strong></p>
              </li>
            </ul>
          </a>
          <p>Need to find out about my work?</p>
          <p>
            Here you will find my best <strong>articles</strong> and <strong>projects</strong> I have written over the years of open-source development.
            This CV page acts as a signpost, so if you want more information about my profile, articles or projects, just click the button or text.
          </p>

          <hr>

          <div class='row align-items-center'>
            <div class='col-1'>
              <p class='fs-2 fa fa-flag-o'></p>
            </div>
            <div class='col'>
              <p class='fs-6'>
                <strong id='count-articles'>0 articles</strong> and <strong id='count-projects'>0 projects</strong>
                have already been created.
              </p>
            </div>
          </div>
        </div>
      </div>
    `}`;
    this.innerHTML = template
  };

  init_spinner() {
    this.innerHTML = "<elm-spinner></elm-spinner>"
  };

  init_count_articles(length) {
    let count_articles = document.getElementById("count-articles");
    count_articles.innerText = `${length} articles`
  };

  init_count_projects(length) {
    let count_projects = document.getElementById("count-projects");
    count_projects.innerText = `${length} projects`
  }
}