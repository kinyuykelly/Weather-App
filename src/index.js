
function fetchWeatherData(response){
    let temperatureElement = document.querySelector(".current-temperature");
    let cityElement  = document.querySelector(".current-city");
    let description = document.querySelector(".current-description");
    let humidty = document.querySelector(".current-humidity");
    let wind = document.querySelector(".current-wind");
    let icon = document.querySelector(".cloud-icon");
    let unit = document.querySelector("#current-temperature-unit");

    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    description.innerHTML = response.data.condition.description;
    humidty.innerHTML = `Humidity:${response.data.temperature.humidity}%,`;
    wind.innerHTML =`Wind:${response.data.wind.speed}km/h`;
    icon.src = response.data.condition.icon_url;
    unit.innerHTML = "&degc"

    getForecast(response.data.city);
    }
    
function searchCity(city){
let apiKey = "a235423bf4aefc61ac00dafo8c073tb3";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(fetchWeatherData);
}

function formatDate(date){
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();

    if(minutes < 10){
        minutes = `0${minutes}`;
    }

    if(hours < 10){
        hours = `0${hours}`;
    }

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
        ];

   let formattedDay = days[day];
   return `${formattedDay} ${hours}:${minutes},` 
    } 
   
   function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector(".search-input");
    searchCity(searchInput.value);
  }
  
let date = document.querySelector(".current-date");
date.innerHTML = formatDate(new Date());

function formatDay(timeStamp){
    let date = new Date(timeStamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
}
function getForecast(city){
    let apiKey = "a235423bf4aefc61ac00dafo8c073tb3";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response){
    let forecastHtml = "";
    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
        forecastHtml = 
        forecastHtml + 
        `
        <div class="weather-forecast">
        <div class="weather-forecast-day">
          <p class="weather-forecast-date">${formatDay(day.time)}</p>
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" alt="weather-forecast-icon">
          <div class="weather-forecast-temperatures">
            <p class="weather-forecast-temperature-max">
              <strong>${Math.round(day.temperature.maximum)}&deg;</strong>
            </p>
            <p class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}&deg;</p>
          </div>
        </div>
        </div>`; 
        }
    });
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}
let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Douala");

