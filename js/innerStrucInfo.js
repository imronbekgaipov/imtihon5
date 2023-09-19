import getData from "./request.js";

const countryInfo = document.querySelector(".countryInfo");

const body = document.querySelector("body");
const darkBtn = document.getElementById("dark-btn");
const lightBtn = document.getElementById("light-btn");
const mode = localStorage.getItem("mode");

if (mode) {
  body.classList.add("dark-mode");
  darkBtn.classList.toggle("hidden");
  lightBtn.classList.toggle("hidden");
}
const toggleModeBtn = () => {
  darkBtn.classList.toggle("hidden");
  lightBtn.classList.toggle("hidden");
  body.classList.toggle("dark-mode");
};
darkBtn.addEventListener("click", () => {
  toggleModeBtn();
  localStorage.setItem("mode", "dark-mode");
});
lightBtn.addEventListener("click", () => {
  toggleModeBtn();
  localStorage.setItem("mode", "");
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString).get("slug");

let api = `https://countries-api-v7sn.onrender.com/countries/slug/${urlParams}`;

getData(api)
  .then((data) => {
    updateUiIn(data);
  })
  .catch((error) => {
    console.log(error);
  });

const updateUiIn = (data) => {
  countryInfo.innerHTML = "";
  const {
    flags,
    name,
    population,
    region,
    borders,
    subregion,
    capital,
    currencies,
    languages,
  } = data;

  let pop = population.toLocaleString();
  countryInfo.innerHTML = `
  <div class="all-wrapper">
  <div class="image-wr">
  <img src=${flags.svg} alt="" flag img>
  </div>
  <div class="all-info">
  <div class="common-Name"><h2>${name.common}</h2></div>
  <div class="infos-dis">
  <div class="left-info">
  <p><span>Native Name: </span> ${name.nativeName}</p>
  <p><span>Population: </span> ${pop}</p>
  <p><span>Region: </span> ${region}</p>
  <p><span>Sub Region: </span> ${subregion}</p>
  <p><span>Capital: </span> ${capital}</p>
  </div>
  <div class="right-info">
    <p><span>Top Level Domain: </span>${".be"}</p>
    <p><span>Currencies: </span>${currencies}</p>
    <p><span>Languages: </span>${languages}</p>
  </div>
  </div>
  <div class="bottom-links">
  <p class="br-btn-wr">
  <span>Border Countries:</span>
  ${
    borders && borders.length > 0
      ? borders
          .map(
            (border) =>
              `<a class="bor" href="innerStrucInfo.html?slug=${border.slug}">${border.common}</a>`
          )
          .join(" ")
      : "no borders"
  }
</p>
    </p>
  </div>
  </div>
  </div>
  `;
};
