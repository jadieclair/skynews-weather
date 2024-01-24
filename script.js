const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showTemperature);

function showTemperature(event) {
  event.preventDefault();
  const city = document.querySelector("#city");
  const h2 = document.querySelector("#location");
  h2.innerHTML = city.value;
  updateTemp();
}
