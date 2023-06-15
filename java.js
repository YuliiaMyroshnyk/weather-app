let currentDate = new Date();
let dayTime = document.querySelector("#timeToday");
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
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#currentWind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#currentHumidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#currentFeel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  console.log(response.data.sys.sunrise);
}

function search(event) {
  event.preventDefault();
  let apiKey = "c819171fe0abdc14039af4ef5dda283b";
  let city = document.querySelector("#city-search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWheatherCondition);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

function showPosition(position) {
  let apiKey = "c819171fe0abdc14039af4ef5dda283b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemp);
}

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let currentWeather = document.querySelector("#currentTemp");
  currentWeather.innerHTML = `${temp} `;
  let currentCity = document.querySelector("#currentCity");
  currentCity.innerHTML = `${response.data.name}`;
  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#currentWind");
  currentWind.innerHTML = ` ${wind}`;
  let humidity = Math.round(response.data.main.humidity);
  let currentHumidity = document.querySelector("#currentHumidity");
  currentHumidity.innerHTML = ` ${humidity}`;
  let realFeel = Math.round(response.data.main.feels_like);
  let currentFeel = document.querySelector("#currentFeel");
  currentFeel.innerHTML = ` ${realFeel}`;
  console.log(response.data);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-weather-button");
currentButton.addEventListener("click", currentPosition);
