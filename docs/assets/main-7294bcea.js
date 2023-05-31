(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const l of t)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function i(t){const l={};return t.integrity&&(l.integrity=t.integrity),t.referrerPolicy&&(l.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?l.credentials="include":t.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(t){if(t.ep)return;t.ep=!0;const l=i(t);fetch(t.href,l)}})();function _(...a){let e=this;if(e!=""&&e!=null)for(;e.indexOf(a[0])!=-1;)e=e.replace(a[0],a[1]);return e}String.prototype.gsub=_;function u(){return this.gsub(" ","-").toLowerCase().replace("---","-").gsub("-|-","-")}String.prototype.url_form=u;function h(){let e=new Date(this).toISOString().replace(/T.*$/m,"").split("-"),i=e[2],r=e[1],t=e[0];return`${i}. ${r}. ${t}`}String.prototype.to_date=h;const o={elm_projects_length:"eprojectsl",elm_articles_length:"earticlesl",elm_greet_loaded:"egreetl"},d={profile:"https://api.github.com/users/filipvrba",repos:"https://api.github.com/users/filipvrba/repos?per_page=100",gists:"https://api.github.com/users/filipvrba/gists"};class m{static http_get(e,i){fetch(e).then(r=>r.json()).then(r=>{if(r.status_code){if(console.error(`GET: ${r.status_code} ${r.status}`),i)return i([])}else if(i)return i(r)})}}class p{static send(e,i=null){e=new CustomEvent(e,{detail:i}),document.dispatchEvent(e)}}class g extends HTMLElement{constructor(){super(),this._h_elm_projects_length=e=>this.init_count_projects(e.detail),this._h_elm_articles_length=e=>this.init_count_articles(e.detail),this.init_spinner(),this.get_data(e=>{this.init_elm(e),p.send(o.elm_greet_loaded)})}connectedCallback(){document.addEventListener(o.elm_projects_length,this._h_elm_projects_length),document.addEventListener(o.elm_articles_length,this._h_elm_articles_length)}disconnectedCallback(){document.removeEventListener(o.elm_projects_length,this._h_elm_projects_length),document.removeEventListener(o.elm_articles_length,this._h_elm_articles_length)}get_data(e){m.http_get(d.profile,i=>{let r={avatar:i.avatar_url,full_name:i.name,profile_url:i.html_url};e&&e(r)})}init_elm(e){let i=`${`
      <div class='row justify-content-center pb-3 mb-4 pt-3 mt-4'>
        <div class='col-lg-6'>
          <p class='h1 m-0'>Resources for a CV With More Clarity</p>
          <a href='${e.profile_url}' target='_blank' style='color: inherit;'>
            <ul class='nav list-unstyled d-flex align-items-center'>
              <li class='ms-3'>
                <img src='${e.avatar}' class='rounded d-block mb-3 mt-3' width='50' height='50' />
              </li>
              <li class='ms-3'>
                <p class='m-0'><strong>${e.full_name}</strong></p>
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
    `}`;this.innerHTML=i}init_spinner(){this.innerHTML="<elm-spinner></elm-spinner>"}init_count_articles(e){let i=document.getElementById("count-articles");i.innerText=`${e} articles`}init_count_projects(e){let i=document.getElementById("count-projects");i.innerText=`${e} projects`}}class v extends HTMLElement{constructor(){super(),this._title="CV",this.init_elm()}init_elm(){let e=`${`
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
    `}`;this.innerHTML=e}}class f extends HTMLElement{constructor(){super(),this.innerHTML=this.init_html()}init_html(){return`
    <div class='d-flex justify-content-center'>
      <div class='spinner-border' role='status'>
        <span class='visually-hidden'>Loading...</span>
      </div>
    </div>
    `}}class b extends HTMLElement{constructor(){super(),this._h_elm_greet_loaded=()=>this.get_data(e=>{p.send(o.elm_articles_length,e.length),this.init_elm(e)}),this.init_spinner()}get_data(e){m.http_get(d.gists,i=>{e&&e((()=>{let t=[];return i.forEach(l=>{let s=l.description.split(". "),n=s[0],c=s.slice(1,s.length).join(". ");n&&c&&t.push({id:l.id,name:n,description:c,url:l.html_url,created_at:l.created_at})}),t})())})}connectedCallback(){document.addEventListener(o.elm_greet_loaded,this._h_elm_greet_loaded)}disconnectedCallback(){document.removeEventListener(o.elm_greet_loaded,this._h_elm_greet_loaded)}init_elm(e){let r=`${`
      <div class='accordion mx-auto col-lg-9' id='accordionArticles'>
        ${(()=>{let t="";if(e.length==0||e[0].id==-1)return t=`
        <div class='text-center'>
          <p class='h4 text-muted'>no articles found</p>
        </div>
        `,t;for(let l=0;l<e.length;l++){let s=e[l],n=`${s.id}-${s.name.url_form()}`,c=`${`
          <div id='${n}' class='accordion-item'>
            <h2 class='accordion-header' id='heading_${n}'>
              <button id='button_${n}' class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapse_${n}' aria-expanded='false' aria-controls='collapse_${n}'>
                <p class='h5 mb-0'>${s.name}</p>
              </button>
            </h2>
            <div id='collapse_${n}' class='accordion-collapse collapse' aria-labelledby='heading_${n}' data-bs-parent='#accordionArticles'>
              <div class='accordion-body'>
                
                <div class='mb-3'>
                  <div class='row g-0'>
                    <div class='container'>
                      <div class='card-body'>
                        <p class='card-text'>${s.description}</p>
                        <div class='row g-0'>
                          <div class='col-6' style='margin-top: auto; margin-bottom: auto;'>
                            <p class='card-text'><small class='text-muted'>Created by ${s.created_at.to_date()}</small></p>
                          </div>

                          <div class='col-6 text-center'>
                              <a href='${s.url}' target='_blank' class='btn btn-primary card-text'>Read...</a>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        `}`;t+=`${c}
`}return t}).call()}
      </div>
    `}`;this.innerHTML=r}init_spinner(){this.innerHTML="<elm-spinner></elm-spinner>"}}class $ extends HTMLElement{constructor(){super(),this._h_elm_greet_loaded=()=>this.get_data(e=>{p.send(o.elm_projects_length,e.length),this.init_elm(e)}),this.init_spinner()}connectedCallback(){document.addEventListener(o.elm_greet_loaded,this._h_elm_greet_loaded)}disconnectedCallback(){document.removeEventListener(o.elm_greet_loaded,this._h_elm_greet_loaded)}get_data(e){m.http_get(d.repos,i=>{e&&e((()=>{let t=[];return i.forEach(s=>{Number(s.stargazers_count)>0&&s.description&&s.topics.length>0&&t.push({name:s.name,description:s.description,category:s.topics.slice(0,3).join(", "),url:s.html_url,created_at:s.created_at.to_date(),stargazers_count:s.stargazers_count})}),t.sort((s,n)=>s.stargazers_count<n.stargazers_count)})())})}init_elm(e){let r=`${`
    <div class='accordion mx-auto col-lg-9' id='accordionProjects'>
      ${(()=>{let t="";e.length==0&&(t=`
        <div class='text-center'>
          <p class='h4 text-muted'>no projects found</p>
        </div>
        `);for(let l=0;l<e.length;l++){let s=e[l],n=`${`
        <div class='accordion-item'>
          <h2 class='accordion-header' id='heading_${l}'>
            <button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapse_${l}' aria-expanded='false' aria-controls='collapse_${l}'>
              <p class='h5 mb-0'>${s.name}</p>
            </button>
          </h2>
          <div id='collapse_${l}' class='accordion-collapse collapse' aria-labelledby='heading_${l}' data-bs-parent='#accordionProjects'>
            <div class='accordion-body'>
              
            <div class='mb-3'>
              <div class='row g-0'>
                <div class='container'>
                  <div class='card-body'>
                    <p class='card-text'>${s.description}</p>
                    <div class='row g-0'>
                      <div class='col-6' style='margin-top: auto; margin-bottom: auto;'>
                        <p class='card-text'><small class='text-muted'>${s.category} | ${s.created_at}</small></p>
                      </div>

                      <div class='col-6 text-center'>
                        <a href='${s.url}' target='_blank' class='btn btn-primary card-text'>See details</a>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            </div>
          </div>
        </div>
        `}`;t+=`${n}
`}return t}).call()}
    </div>
    `}`;this.innerHTML=r}init_spinner(){this.innerHTML="<elm-spinner></elm-spinner>"}}window.customElements.define("elm-greet",g);window.customElements.define("elm-home",v);window.customElements.define("elm-spinner",f);window.customElements.define("elm-articles",b);window.customElements.define("elm-projects",$);const y={err_404:`
    <h1>404</h1>
    <p>Not found</p>
  `,home:`
    <div class='container py-3'>
      <elm-header></elm-header>
      <main>
        <elm-home></elm-home>
      </main>
      <elm-footer></elm-footer>
    </div>
  `};window.PAGES=y;document.querySelector("#app").innerHTML=PAGES.home;
