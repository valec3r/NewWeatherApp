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

// Search for current location

function searchLocation(position) {
  let apiKey = "da4354ccc4b5c937168c50391a787c99";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}

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
