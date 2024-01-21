
function fetchWeatherData(response){
    let temperatureElement = document.querySelector(".current-temperature");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    let cityElement  = document.querySelector(".current-city");
    cityElement.innerHTML = response.data.city;
    let description = document.querySelector(".current-description");
    description.innerHTML = response.data.condition.description;
    let humidty = document.querySelector(".current-humidity");
    humidty.innerHTML = `Humidity:${response.data.temperature.humidity}%,`;
    let wind = document.querySelector(".current-wind");
    wind.innerHTML =`Wind:${response.data.wind.speed}km/h`;
    let icon = document.querySelector(".cloud-icon");
    icon.src = response.data.condition.icon_url;
    
    console.log(response.data)
    }
    
function searchCity(city){
let apiKey = "a235423bf4aefc61ac00dafo8c073tb3";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
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


function displayForecast(){
    let forecastHtml = "";
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu",]
    days.forEach(function (day) {
        forecastHtml = 
        forecastHtml + 
        `
        <div class="weather-forecast">
        <div class="weather-forecast-day">
          <p class="weather-forecast-date">${day}</p>
          <img src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png" class="weather-forecast-icon" alt="weather-forecast-icon">
          <div class="weather-forecast-temperatures">
            <p class="weather-forecast-temperature-max">
              <strong>-7&deg;</strong>
            </p>
            <p class="weather-forecast-temperature-min">-12&deg;</p>
          </div>
        </div>
        </div>`; 
    });
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}
let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Douala")
displayForecast();