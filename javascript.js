let currentDate = new Date();

let dayTime = document.querySelector("#currentTime");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[currentDate.getDay()];

let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
dayTime.innerHTML = `${day}, ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.time
            )}</div>
            <div class="forecast-humidity">
              <img src="images/rain_drop.png" class="rain-drop" /><span class="forecast-humidity"> ${Math.round(
                forecastDay.temperature.humidity
              )}% </span>
            </div>
            <div class="forecast-img">
            <img
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                forecastDay.condition.icon
              }.png" width="80px" id="forecast-icon"
            /> </div>

            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> ${Math.round(
                forecastDay.temperature.maximum
              )}° </span>|
              <span class="weather-forecast-temperature-min"> ${Math.round(
                forecastDay.temperature.minimum
              )}° </span>
            </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5ccco0ca11b8e4f4e0fbtd4305206aef";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWheatherCondition(response) {
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#currentCity").innerHTML = response.data.city;
  document.querySelector("#country").innerHTML = response.data.country;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#currentWind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#currentHumidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );
  document.querySelector("#currentFeel").innerHTML = Math.round(
    response.data.temperature.feels_like
  );

  celciusTemperature = response.data.temperature.current;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  getForecast(response.data.coordinates);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;

  searchCity(city);
}

function searchCity(city) {
  let apiKey = "5ccco0ca11b8e4f4e0fbtd4305206aef";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWheatherCondition);
}

function showWeatherLocation(response) {
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#currentCity").innerHTML = response.data.city;
  document.querySelector("#country").innerHTML = response.data.country;
  document.querySelector("#currentWind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#currentHumidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );
  document.querySelector("#currentFeel").innerHTML = Math.round(
    response.data.temperature.feels_like
  );

  getForecast(response.data.coordinates);
}

function showPosition(position) {
  let apiKey = "5ccco0ca11b8e4f4e0fbtd4305206aef";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showWeatherLocation);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-weather-button");
currentButton.addEventListener("click", currentPosition);

let form = document.querySelector("form");
form.addEventListener("submit", search);

searchCity("London");
