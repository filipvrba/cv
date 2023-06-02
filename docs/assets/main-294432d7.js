(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(s){if(s.ep)return;s.ep=!0;const l=t(s);fetch(s.href,l)}})();function u(...a){let e=this;if(e!=""&&e!=null)for(;e.indexOf(a[0])!=-1;)e=e.replace(a[0],a[1]);return e}String.prototype.gsub=u;function h(){return this.gsub(" ","-").toLowerCase().replace("---","-").gsub("-|-","-")}String.prototype.url_form=h;function _(){let e=new Date(this).toISOString().replace(/T.*$/m,"").split("-"),t=e[2],r=e[1],s=e[0];return`${t}. ${r}. ${s}`}String.prototype.to_date=_;const c={elm_projects_length:"eprojectsl",elm_articles_length:"earticlesl",elm_greet_loaded:"egreetl"},d={profile:"https://api.github.com/users/filipvrba",repos:"https://api.github.com/users/filipvrba/repos?per_page=100",gists:"https://api.github.com/users/filipvrba/gists"},g="https://filipvrba.github.io/circles/";class m{static http_get(e,t){fetch(e).then(r=>r.json()).then(r=>{if(r.status_code){if(console.error(`GET: ${r.status_code} ${r.status}`),t)return t([])}else if(t)return t(r)})}}class v extends HTMLElement{constructor(){super(),this._h_elm_projects_length=e=>this.init_count_projects(e.detail),this._h_elm_articles_length=e=>this.init_count_articles(e.detail),this.init_elm()}connectedCallback(){document.addEventListener(c.elm_projects_length,this._h_elm_projects_length),document.addEventListener(c.elm_articles_length,this._h_elm_articles_length)}disconnectedCallback(){document.removeEventListener(c.elm_projects_length,this._h_elm_projects_length),document.removeEventListener(c.elm_articles_length,this._h_elm_articles_length)}init_elm(e){let t=`
      <div class='row justify-content-center pb-3 mb-4 pt-3 mt-4'>
        <div class='col-lg-6'>
          <p class='h1 mb-3'>Resources for a CV With More Clarity</p>
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
    `;this.innerHTML=t}init_count_articles(e){let t=document.getElementById("count-articles");t.innerText=`${e} articles`}init_count_projects(e){let t=document.getElementById("count-projects");t.innerText=`${e} projects`}}class f extends HTMLElement{constructor(){super(),this.get_data(e=>this.init_elm(e))}get_data(e){m.http_get(d.profile,t=>{let r={avatar:t.avatar_url,full_name:t.name,profile_url:t.html_url};e&&e(r)})}init_elm(e){let t=`${`
      <div class='container py-5'>
        <div class='text-center'>
          <a href='${e.profile_url}' target='_blank' style='color: inherit;'>
            <img src='${e.avatar}' class='bd-placeholder-img rounded-circle mb-3 mt-3' width='256' height='256' />
            <h1 class='display-1 m-0'><strong>${e.full_name}</strong></h1>
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
    `}`;this.innerHTML=t}}class b extends HTMLElement{constructor(){super(),this.innerHTML=this.init_html()}init_html(){return`
    <div class='d-flex justify-content-center'>
      <div class='spinner-border' role='status'>
        <span class='visually-hidden'>Loading...</span>
      </div>
    </div>
    `}}class p{static send(e,t=null){e=new CustomEvent(e,{detail:t}),document.dispatchEvent(e)}}class $ extends HTMLElement{constructor(){super(),this.get_data(e=>{p.send(c.elm_articles_length,e.length),this.init_elm(e)}),this.init_spinner()}get_data(e){m.http_get(d.gists,t=>{e&&e((()=>{let s=[];return t.forEach(l=>{let i=l.description.split(". "),n=i[0],o=i.slice(1,i.length).join(". ");n&&o&&s.push({id:l.id,name:n,description:o,url:l.html_url,created_at:l.created_at})}),s})())})}init_elm(e){let r=`${`
      <div class='accordion mx-auto col-lg-9' id='accordionArticles'>
        ${(()=>{let s="";if(e.length==0||e[0].id==-1)return s=`
        <div class='text-center'>
          <p class='h4 text-muted'>no articles found</p>
        </div>
        `,s;for(let l=0;l<e.length;l++){let i=e[l],n=`${i.id}-${i.name.url_form()}`,o=`${`
          <div id='${n}' class='accordion-item'>
            <h2 class='accordion-header' id='heading_${n}'>
              <button id='button_${n}' class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapse_${n}' aria-expanded='false' aria-controls='collapse_${n}'>
                <p class='h5 mb-0'>${i.name}</p>
              </button>
            </h2>
            <div id='collapse_${n}' class='accordion-collapse collapse' aria-labelledby='heading_${n}' data-bs-parent='#accordionArticles'>
              <div class='accordion-body'>
                
                <div class='mb-3'>
                  <div class='row g-0'>
                    <div class='container'>
                      <div class='card-body'>
                        <p class='card-text'>${i.description}</p>
                        <div class='row g-0'>
                          <div class='col-6' style='margin-top: auto; margin-bottom: auto;'>
                            <p class='card-text'><small class='text-muted'>Created by ${i.created_at.to_date()}</small></p>
                          </div>

                          <div class='col-6 text-center'>
                              <a href='${i.url}' target='_blank' class='btn btn-primary card-text'>Read...</a>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        `}`;s+=`${o}
`}return s}).call()}
      </div>
    `}`;this.innerHTML=r}init_spinner(){this.innerHTML="<elm-spinner></elm-spinner>"}}class y extends HTMLElement{constructor(){super(),this.get_data(e=>{p.send(c.elm_projects_length,e.length),this.init_elm(e)}),this.init_spinner()}get_data(e){m.http_get(d.repos,t=>{e&&e((()=>{let s=[];return t.forEach(i=>{Number(i.stargazers_count)>0&&i.description&&i.topics.length>0&&s.push({name:i.name,description:i.description,category:i.topics.slice(0,3).join(", "),url:i.html_url,created_at:i.created_at.to_date(),stargazers_count:i.stargazers_count})}),s.sort((i,n)=>i.stargazers_count<n.stargazers_count)})())})}init_elm(e){let r=`${`
    <div class='accordion mx-auto col-lg-9' id='accordionProjects'>
      ${(()=>{let s="";e.length==0&&(s=`
        <div class='text-center'>
          <p class='h4 text-muted'>no projects found</p>
        </div>
        `);for(let l=0;l<e.length;l++){let i=e[l],n=`${`
        <div class='accordion-item'>
          <h2 class='accordion-header' id='heading_${l}'>
            <button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapse_${l}' aria-expanded='false' aria-controls='collapse_${l}'>
              <p class='h5 mb-0'>${i.name}</p>
            </button>
          </h2>
          <div id='collapse_${l}' class='accordion-collapse collapse' aria-labelledby='heading_${l}' data-bs-parent='#accordionProjects'>
            <div class='accordion-body'>
              
            <div class='mb-3'>
              <div class='row g-0'>
                <div class='container'>
                  <div class='card-body'>
                    <p class='card-text'>${i.description}</p>
                    <div class='row g-0'>
                      <div class='col-6' style='margin-top: auto; margin-bottom: auto;'>
                        <p class='card-text'><small class='text-muted'>${i.category} | ${i.created_at}</small></p>
                      </div>

                      <div class='col-6 text-center'>
                        <a href='${i.url}' target='_blank' class='btn btn-primary card-text'>See details</a>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            </div>
          </div>
        </div>
        `}`;s+=`${n}
`}return s}).call()}
    </div>
    `}`;this.innerHTML=r}init_spinner(){this.innerHTML="<elm-spinner></elm-spinner>"}}class E extends HTMLElement{constructor(){super(),this._h_resize=e=>{let t={width:window.innerWidth,height:416},r=document.getElementById("ibackground");return r.width=t.width,r.height=t.height},this._arguments=["panel=false","speed=50-100","radius=1-5","circles=50"],this.init_elm()}connectedCallback(){window.addEventListener("resize",this._h_resize),this._h_resize.call()}disconnectedCallback(){window.removeEventListener("resize",this._h_resize)}init_elm(e){let t=`${`
      <iframe id='ibackground' src='${g}?${this._arguments.join("&")}' title='Circles'></iframe> 
    `}`;this.innerHTML=t}}window.customElements.define("elm-greet",v);window.customElements.define("elm-home",f);window.customElements.define("elm-spinner",b);window.customElements.define("elm-articles",$);window.customElements.define("elm-projects",y);window.customElements.define("elm-background",E);const w={err_404:`
    <h1>404</h1>
    <p>Not found</p>
  `,home:`
    <elm-background></elm-background>
    <div class='container py-3'>
      <elm-header></elm-header>
      <main>
        <elm-home></elm-home>
      </main>
      <elm-footer></elm-footer>
    </div>
  `};window.PAGES=w;document.querySelector("#app").innerHTML=PAGES.home;
