const PAGES = {
  err_404: `${`\n    <h1>404</h1>\n    <p>Not found</p>\n  `}`,
  home: `${`
    <div class='container py-3'>
      <elm-header></elm-header>
      <main>
        <elm-home></elm-home>
      </main>
      <elm-footer></elm-footer>
    </div>
  `}`
};

window.PAGES = PAGES