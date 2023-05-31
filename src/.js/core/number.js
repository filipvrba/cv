function to_date() {
  let date = new Date(this * 1_000);
  let s_iso_date = date.toISOString().replace(/T.*$/m, "").split("-");
  let day = s_iso_date[2];
  let month = s_iso_date[1];
  let year = s_iso_date[0];
  return `${day}. ${month}. ${year}`
};

Number.prototype.to_date = to_date;

function to_date_with_time() {
  let date = new Date(this * 1_000);
  let s_iso_date = date.toISOString().replace(/T.*$/m, "").split("-");
  let day = s_iso_date[2];
  let month = s_iso_date[1];
  let year = s_iso_date[0];

  let time = date.toISOString().replace(/^.*T/m, "").replace(
    /\..*$/m,
    ""
  );

  return `${day}. ${month}. ${year} - ${time}`
};

Number.prototype.to_date_with_time = to_date_with_time