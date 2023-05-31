function gsub(...args) {
  let result = this;

  if (result != "" && result != null) {
    while (true) {
      if (result.indexOf(args[0]) == -1) break;
      result = result.replace(args[0], args[1])
    }
  };

  return result
};

String.prototype.gsub = gsub;

function url_form() {
  return this.gsub(" ", "-").toLowerCase().replace("---", "-").gsub(
    "-|-",
    "-"
  )
};

String.prototype.url_form = url_form;

function to_date() {
  let date = new Date(this);
  let s_iso_date = date.toISOString().replace(/T.*$/m, "").split("-");
  let day = s_iso_date[2];
  let month = s_iso_date[1];
  let year = s_iso_date[0];
  return `${day}. ${month}. ${year}`
};

String.prototype.to_date = to_date