const countries = document.querySelector(".countries");
const input = document.querySelector("#input");
const select = document.querySelector("#select");
const toTop = document.querySelector(".to-up");

const countryName = document.getElementsByClassName("countryName");
const regionName = document.getElementsByClassName("regions");

const body = document.querySelector("body");
const lightBtn = document.getElementById("light-btn");
const darkBtn = document.getElementById("dark-btn");
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

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
});

let data = [];

import getData from "./request.js";

getData("https://countries-api-v7sn.onrender.com/countries?limit=250")
  .then((data) => {
    updateUI(data.data);
  })
  .catch((error) => {
    console.log(error);
  });

const updateUI = (data) => {
  countries.innerHTML = "";
  data.forEach((item) => {
    const { flags, name, population, region, capital } = item;
    let populations = population.toLocaleString();
    countries.innerHTML += `
      <a class="country" href="innerStrucInfo.html?slug=${item.name.slug}"> 
      <img src=${flags.svg} alt="${name.common} flag img" height="160px">
      <h3 class="countryName">${name.common}</h3>
      <p class="population"> <span> Population: </span>  ${populations}</p>
      <p class="regions"> <span> Region: </span> ${region}</p>
      <p id="capital" > <span> Capital: </span> ${
        capital ? capital : "no capital"
      }</p>
      </a>
      `;
  });
};

export default getData;

input.addEventListener("input", () => {
  let val = input.value.toLowerCase().trim();
  Array.from(countryName).forEach((item) => {
    item.textContent.toLowerCase().includes(val)
      ? item.parentElement.classList.remove("hidden")
      : item.parentElement.classList.add("hidden");
  });
});

select.addEventListener("change", () => {
  Array.from(regionName).forEach((sItem) => {
    sItem.innerText.includes(select.value) || select.value == "All"
      ? sItem.parentElement.classList.remove("hidden")
      : sItem.parentElement.classList.add("hidden");
  });
});
