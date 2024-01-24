let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showTemperature);

function showTemperature(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  fetchTemp(city.value);
}

function fetchTemp(city) {
  let key = `b9df0ato5f746953eaf6201671625960`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;
  axios.get(apiUrl).then(updateTemp);
}

function updateTemp(response) {
  let currentTemp = document.querySelector("#units");
  let unitTemp = response.data.temperature.current;
  let h2 = document.querySelector("#location");
  h2.innerHTML = response.data.city;
  currentTemp.innerHTML = Math.round(unitTemp);
  windSpeed(response);
  feelsLike(response);
  humidity(response);
  conditions(response);
}

let date = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[date.getDay()];

function showDay() {
  let dayElement = document.querySelector("#day");
  dayElement.innerHTML = day;
}

showDay();

function hourAndMinutes() {
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();

  let currentTime = `${currentHour}h${currentMinutes}`;

  let hourAndMinutes = document.querySelector("#hourAndMinutes");
  hourAndMinutes.innerHTML = currentTime;
}

hourAndMinutes();

function feelsLike(response) {
  let feelsLike = document.querySelector("#feels-like");
  let feelsLikeElement = Math.round(response.data.temperature.feels_like);
  feelsLike.innerHTML = feelsLikeElement;
}

function windSpeed(response) {
  let wind = document.querySelector("#wind-speed");
  let windElement = response.data.wind.speed;
  wind.innerHTML = Math.round(windElement);
  console.log(response);
}

function humidity(response) {
  let humidity = document.querySelector("#humidity");
  let humidityElement = Math.round(response.data.temperature.humidity);
  humidity.innerHTML = humidityElement;
}

function conditions(response) {
  let condition = document.querySelector("#conditions");
  let conditionsElement = response.data.condition.description;
  condition.textContent = conditionsElement;
}

fetchTemp("London");
