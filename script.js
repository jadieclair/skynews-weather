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
  let wind = document.querySelector("#wind-speed");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let conditions = document.querySelector("#conditions");
  let time = document.querySelector("#hourAndMinutes");
  let day = document.querySelector("#day");
  let monthElement = document.querySelector("#month");
  let yearElement = document.querySelector("#year");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#icon");

  h2.innerHTML = response.data.city;
  currentTemp.innerHTML = `${Math.round(unitTemp)}°C`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}Km/h`;
  feelsLike.innerHTML = `${Math.round(response.data.temperature.feels_like)}°C`;
  humidity.innerHTML = `${Math.round(response.data.temperature.humidity)}%`;
  conditions.innerHTML = response.data.condition.description;
  time.innerHTML = showTime(date);
  day.innerHTML = showDay(date);
  monthElement.innerHTML = showMonth(date);
  yearElement.innerHTML = date.getFullYear();
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="emoji"/>`;
}

function showDay(date) {
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

  return day;
}

function showMonth(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  return month;
}

function showTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}h${minutes}`;
}

function showForecast() {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
         <div class="row">
              <div class="col-2">
                <div class="weather-forecast-day">${day}</div>
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-night.png"
                  width="40px"
                  alt=""
                />
                <div>
                  <span class="weather-forecast-max"> 18 </span>
                  <span class="weather-forecast-min"> 12 </span>
                </div>
              </div>
            </div>
`;
  });

  let forecastElement = document.querySelector("#weekly-forecast");
  forecastElement.innerHTML = forecastHTML;
}

fetchTemp("London");
showForecast();
