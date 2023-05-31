import { EVENTS, GITHUB_URL } from "../constants";
import Events from "../events";
import Net from "../core/net";

export default class ElmProjects extends HTMLElement {
  constructor() {
    super();

    this._h_elm_greet_loaded = () => (
      this.get_data((data) => {
        Events.send(EVENTS.elm_projects_length, data.length);
        this.init_elm(data)
      })
    );

    this.init_spinner()
  };

  connectedCallback() {
    document.addEventListener(
      EVENTS.elm_greet_loaded,
      this._h_elm_greet_loaded
    )
  };

  disconnectedCallback() {
    document.removeEventListener(
      EVENTS.elm_greet_loaded,
      this._h_elm_greet_loaded
    )
  };

  get_data(block) {
    Net.http_get(GITHUB_URL.repos, (repos) => {
      let repos_filter = () => {
        let result = [];

        repos.forEach((repo) => {
          if (Number(repo.stargazers_count) > 0 && (repo.description && repo.topics.length > 0)) {
            result.push({
              name: repo.name,
              description: repo.description,
              category: repo.topics.slice(0, 3).join(", "),
              url: repo.html_url,
              created_at: repo.created_at.to_date(),
              stargazers_count: repo.stargazers_count
            })
          }
        });

        let result_sort = result.sort((a, b) => (
          a.stargazers_count < b.stargazers_count
        ));

        return result_sort
      };

      if (block) block(repos_filter())
    })
  };

  init_elm(data) {
    let l_acc_item = () => {
      let result = "";

      if (data.length == 0) {
        result = `${`
        <div class='text-center'>
          <p class='h4 text-muted'>no projects found</p>
        </div>
        `}`
      };

      for (let i = 0; i < data.length; i++) {
        let project = data[i];
        let template = `${`
        <div class='accordion-item'>
          <h2 class='accordion-header' id='heading_${i}'>
            <button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapse_${i}' aria-expanded='false' aria-controls='collapse_${i}'>
              <p class='h5 mb-0'>${project.name}</p>
            </button>
          </h2>
          <div id='collapse_${i}' class='accordion-collapse collapse' aria-labelledby='heading_${i}' data-bs-parent='#accordionProjects'>
            <div class='accordion-body'>
              
            <div class='mb-3'>
              <div class='row g-0'>
                <div class='container'>
                  <div class='card-body'>
                    <p class='card-text'>${project.description}</p>
                    <div class='row g-0'>
                      <div class='col-6' style='margin-top: auto; margin-bottom: auto;'>
                        <p class='card-text'><small class='text-muted'>${project.category} | ${project.created_at}</small></p>
                      </div>

                      <div class='col-6 text-center'>
                        <a href='${project.url}' target='_blank' class='btn btn-primary card-text'>See details</a>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            </div>
          </div>
        </div>
        `}`;
        result += `${template}\n`
      };

      return result
    };

    let template = `${`
    <div class='accordion mx-auto col-lg-9' id='accordionProjects'>
      ${l_acc_item.call()}
    </div>
    `}`;
    this.innerHTML = template
  };

  init_spinner() {
    this.innerHTML = "<elm-spinner></elm-spinner>"
  }
}