import { EVENTS, GITHUB_URL } from "../constants";
import Events from "../events";
import Net from "../core/net";

export default class ElmArticles extends HTMLElement {
  constructor() {
    super();

    this._h_elm_greet_loaded = () => (
      this.get_data((data) => {
        Events.send(EVENTS.elm_articles_length, data.length);
        this.init_elm(data)
      })
    );

    this.init_spinner()
  };

  get_data(block) {
    Net.http_get(GITHUB_URL.gists, (gists) => {
      let gists_filter = () => {
        let result = [];

        gists.forEach((gist) => {
          let description_split = gist.description.split(". ");
          let name = description_split[0];

          let description = description_split.slice(
            1,
            description_split.length
          ).join(". ");

          if (name && description) {
            result.push({
              id: gist.id,
              name,
              description,
              url: gist.html_url,
              created_at: gist.created_at
            })
          }
        });

        return result
      };

      if (block) block(gists_filter())
    })
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

  init_elm(data) {
    let l_acc_item = () => {
      let result = "";

      if (data.length == 0 || data[0].id == -1) {
        result = `${`
        <div class='text-center'>
          <p class='h4 text-muted'>no articles found</p>
        </div>
        `}`;
        return result
      };

      for (let i = 0; i < data.length; i++) {
        let article = data[i];
        let article_id = `${article.id}-${article.name.url_form()}`;
        let template = `${`
          <div id='${article_id}' class='accordion-item'>
            <h2 class='accordion-header' id='heading_${article_id}'>
              <button id='button_${article_id}' class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapse_${article_id}' aria-expanded='false' aria-controls='collapse_${article_id}'>
                <p class='h5 mb-0'>${article.name}</p>
              </button>
            </h2>
            <div id='collapse_${article_id}' class='accordion-collapse collapse' aria-labelledby='heading_${article_id}' data-bs-parent='#accordionArticles'>
              <div class='accordion-body'>
                
                <div class='mb-3'>
                  <div class='row g-0'>
                    <div class='container'>
                      <div class='card-body'>
                        <p class='card-text'>${article.description}</p>
                        <div class='row g-0'>
                          <div class='col-6' style='margin-top: auto; margin-bottom: auto;'>
                            <p class='card-text'><small class='text-muted'>Created by ${article.created_at.to_date()}</small></p>
                          </div>

                          <div class='col-6 text-center'>
                              <a href='${article.url}' target='_blank' class='btn btn-primary card-text'>Read...</a>
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
      <div class='accordion mx-auto col-lg-9' id='accordionArticles'>
        ${l_acc_item.call()}
      </div>
    `}`;
    this.innerHTML = template
  };

  init_spinner() {
    this.innerHTML = "<elm-spinner></elm-spinner>"
  }
}