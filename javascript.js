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
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

function search(event) {
  event.preventDefault();
  let apiKey = "5ccco0ca11b8e4f4e0fbtd4305206aef";
  let city = document.querySelector("#city-search-input").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWheatherCondition);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

function showPosition(position) {
  let apiKey = "5ccco0ca11b8e4f4e0fbtd4305206aef";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemp);
}

function showTemp(response) {
  document.querySelector("#description").innerHTML =
    response.data.condition.description.toUpperCase;
  let temp = Math.round(response.data.temperature.current);
  let currentWeather = document.querySelector("#currentTemp");
  currentWeather.innerHTML = `${temp} `;
  let currentCity = document.querySelector("#currentCity");
  currentCity.innerHTML = `${response.data.city}`;
  document.querySelector("#country").innerHTML = response.data.country;
  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#currentWind");
  currentWind.innerHTML = ` ${wind}`;
  let humidity = Math.round(response.data.temperature.humidity);
  let currentHumidity = document.querySelector("#currentHumidity");
  currentHumidity.innerHTML = ` ${humidity}`;
  let realFeel = Math.round(response.data.temperature.feels_like);
  let currentFeel = document.querySelector("#currentFeel");
  currentFeel.innerHTML = ` ${realFeel}`;
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-weather-button");
currentButton.addEventListener("click", currentPosition);
