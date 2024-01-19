let apiKey = "a235423bf4aefc61ac00dafo8c073tb3";
let apiUrl = `https://api.shecodes.io/weather/v1/current?&key=${apiKey}&units=metric`;

function searchCity(event){
event.preventDefault()
let searchInput = document.querySelector(".search-input");

let city = searchInput.value 
let url = `${apiUrl}&query=${city}`;
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

axios.get(url).then(fetchWeatherData)
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
let date = document.querySelector(".current-date");
date.innerHTML = formatDate(new Date());

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", searchCity);