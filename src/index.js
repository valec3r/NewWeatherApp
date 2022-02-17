function getForecast(coordinates) {
  let apiKey = "016a3d02d3a57ac8d3bd0f8e3156b890";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  console.log(response);

  let displaySearch = document.querySelector("#city");
  displaySearch.innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let degree = document.querySelector("#today-temperature");
  degree.innerHTML = ` ${temp}`;
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].description;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

//Default view at landing//
function searchWeatherBarcelona() {
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "da4354ccc4b5c937168c50391a787c99";
  let city = "Barcelona";
  let unit = "metric";
  let url = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(displayTemp);
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  let apiKey = "016a3d02d3a57ac8d3bd0f8e3156b890";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchCurrentLocation = document.querySelector("#searchcurrent");
searchCurrentLocation.addEventListener("submit", getCurrentLocation);

let currentTime = new Date();

function showToday(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let Today = document.querySelector("#currentDay");
Today.innerHTML = showToday(currentTime);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 4) {
      forecastHTML =
        forecastHTML +
        ` <h5 class="followingDays">${formatDay(forecastDay.dt)}</h5>
 <img
   class="icons-rightside"
   src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
   alt="sun"
   width="64px"
 />
 <p class="temperatureNextDays"><span class="forecast-temperature-max">${Math.round(
   forecastDay.temp.max
 )}°C</span>-<span class="forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°C</span></p>
 <hr />`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

// Search for current location

function searchLocation(position) {
  let apiKey = "da4354ccc4b5c937168c50391a787c99";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}

let celsiusTemperature = null;

function convertoCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#today-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusClick.classList.add("active");
  fahrenheitClick.classList.remove("active");
}

let celsiusClick = document.querySelector("#celsius");
celsiusClick.addEventListener("click", convertoCelsius);

function convertoFahrenheit(event) {
  event.preventDefault();
  let Fdegrees = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#today-temperature");
  temperatureElement.innerHTML = Math.round(Fdegrees);
  celsiusClick.classList.remove("active");
  fahrenheitClick.classList.add("active");
}

let fahrenheitClick = document.querySelector("#fahrenheit");
fahrenheitClick.addEventListener("click", convertoFahrenheit);

searchWeatherBarcelona();
