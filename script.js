// Challenge 6

//Story
// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly

// Criteria
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

//Variables
var searchbtn = document.querySelector(".searchbtn");
var card = document.querySelector(".card");
var dashboard = document.querySelector(".dashboard");
var forecast = document.querySelector("#forecast");
var citysearch = document.querySelector("#citysearch");
var todayDay = document.querySelector(".today");
var currentweather = document.querySelector(".current-weather");
var weathercard = document.querySelector("#weather-card");
var inputs = document.querySelector("#weather-input");

// Event Listener to the searchbtn
searchbtn.addEventListener("click", function () {
    card.classList.add("hidden"), // Hidden the card session
      console.log("card");
    forecast.classList.remove("hidden"); //  Showing the forecast session
    citysearch.classList.add("hidden"); // Hidden the citysearch session
    weathercard.classList.remove("hidden"); //Showing the weather cards session

    //Current day using moment js
    var currentDay = moment().format("MMM Do YY");
    console.log("currentDay");
    todayDay.innerHTML = currentDay;
  searchFromApi();
});

// Populating the weather
// function populateCityWeather() {
//  var btn = document.querySelector("#btn")
//  btn.addEventListener("click" , function(){
//     btn = populateCityWeather
//  })
// }

// API Call
function searchFromApi() {
  var inputs = document.querySelector("#weather-input");
  console.log(inputs);
  var inputValue = inputs.value;
  var apiKey = "041178dcf4de97eb135ec7c055f2f00a";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    inputValue +
    "&appid=" +
    apiKey;

  //  //Fetch function
  fetch(queryURL) // Fetch Data
    .then(function (response) {
      // Promise has been resolve sucessfully
      return response.json(); // parse the response to be an object/promise
    })

    .then(function (data) {
      // new promise has been resolved
      console.log(data);
      searchFromCoordinate(data.coord.lon, data.coord.lat); // data holds the responses from the API
    });
}

//Current Weather- Calling the current weather
function searchFromCoordinate(lon , lat) {
  var apiKey = "041178dcf4de97eb135ec7c055f2f00a";
  var inputs = document.querySelector("#weather-input");
fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial")
  .then(function (response) {
    // Promise has been resolve sucessfully
    return response.json(); // parse the response to be an object/promise
  })

  .then(function (data) {
    // new promise has been resolved
    console.log(data);
   document.querySelector("#temp-display").textContent = data.current.temp
   document.querySelector("#city-display").textContent = inputs.value
  document.querySelector("#humidity").textContent = data.current.humidity
  document.querySelector("#wind-speed").textContent = data.current.wind_speed
  document.querySelector("#uvindex").textContent = data.current.uvi

// {/* <p id="humidity" class="text-muted mb-0">Humidity</p>
//                       <h2 id="wind-speed"><strong></strong>13.8</h2>
//                       <p id="speed" class="text-muted mb-0">Wind Speed</p>
//                       <h2 id="uv"><strong>11.23</strong></h2>
//                       <p id="uvindex" class="text-muted mb-0">UV Index</p>
//                     </div> */}

   for(var i = 1; i < 6 ; i++){
 document.querySelector("#temp" + i).textContent = data.daily[i].temp.day
// five day with Moment JS
   }
    
   
  
  });
}

// Forecast Weather

//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//Local Storage
var storageInput = localStorage.getItem(inputs);
console.log(storageInput);
inputs = storageInput;

citysearch.addEventListener("text", function () {
  console.log("text");

  var text = inputs.text.target.value;
  console.log(text);
  localStorage.setItem(text, inputs);
});


// fetch(file)
// .then((response) => response.json())
// .then((data) => {
// // Weather main data
// let main = data.current.weather[0].main;
// let description = data.current.weather[0].description;
// let temp = Math.round(data.current.temp);
// let pressure = data.current.pressure;
// let humidity = data.current.humidity;
// let name = "";

//Local Storage

// API call
// let queryUrl = "https://api.openweathermap.org/data/2.5/onecall?";
// let lat = "lat=52.229676&";
// let lon = "lon=21.012229&";
//let apiOptions = "units=imperial&exclude=minutely,alerts&";
// let apiKey = "appid=dbb76c5d98d5dbafcb94441c6a10236e";
// let file = queryUrl + lat + lon + apiOptions + apiKey;

// fetch(file)
// .then((response) => response.json())
// .then((data) => {
// // Weather main data
// let main = data.current.weather[0].main;
// let description = data.current.weather[0].description;
// let temp = Math.round(data.current.temp);
// let pressure = data.current.pressure;
// let humidity = data.current.humidity;
// let name = "Miami";

// document.getElementById("wrapper-description").innerHTML = description;
// document.getElementById("wrapper-temp").innerHTML = temp + "°F";
// document.getElementById("wrapper-pressure").innerHTML = pressure;
// document.getElementById("wrapper-humidity").innerHTML = humidity + "°F";
// document.getElementById("wrapper-name").innerHTML = name;

// // Weather hourly data
// let hourNow = data.hourly[0].temp;
// let hour1 = data.hourly[1].temp;
// let hour2 = data.hourly[2].temp;
// let hour3 = data.hourly[3].temp;
// let hour4 = data.hourly[4].temp;
// let hour5 = data.hourly[5].temp;

// document.getElementById("wrapper-hour-now").innerHTML = hourNow + "°";
// document.getElementById("wrapper-hour1").innerHTML = hour1 + "°";
// document.getElementById("wrapper-hour2").innerHTML = hour2 + "°";
// document.getElementById("wrapper-hour3").innerHTML = hour3 + "°";
// document.getElementById("wrapper-hour4").innerHTML = hour4 + "°";
// document.getElementById("wrapper-hour5").innerHTML = hour5 + "°";

// // Time
// let timeNow = new Date().getHours();
// let time1 = timeNow + 1;
// let time2 = time1 + 1;
// let time3 = time2 + 1;
// let time4 = time3 + 1;
// let time5 = time4 + 1;

// document.getElementById("wrapper-time1").innerHTML = time1;
// document.getElementById("wrapper-time2").innerHTML = time2;
// document.getElementById("wrapper-time3").innerHTML = time3;
// document.getElementById("wrapper-time4").innerHTML = time4;
// document.getElementById("wrapper-time5").innerHTML = time5;

// // Weather daily data
// let tomorrowTemp = Math.round(data.daily[0].temp.day);
// let dATTemp = Math.round(data.daily[1].temp.day);
// let tomorrowMain = data.daily[0].weather[0].main;
// let dATTempMain = data.daily[1].weather[0].main;

// document.getElementById("wrapper-forecast-temp-today").innerHTML =
// temp + "°";
// document.getElementById("wrapper-forecast-temp-tomorrow").innerHTML =
// tomorrowTemp + "°";
// document.getElementById("wrapper-forecast-temp-dAT").innerHTML =
// dATTemp + "°";

// // Icons
// let iconBaseUrl = "http://openweathermap.org/img/wn/";
// let iconFormat = ".webp";

// // Today
// let iconCodeToday = data.current.weather[0].icon;
// let iconFullyUrlToday = iconBaseUrl + iconCodeToday + iconFormat;
// document.getElementById("wrapper-icon-today").src = iconFullyUrlToday;

// // Tomorrow
// let iconCodeTomorrow = data.daily[0].weather[0].icon;
// let iconFullyUrlTomorrow = iconBaseUrl + iconCodeTomorrow + iconFormat;
// document.getElementById(
// "wrapper-icon-tomorrow"
// ).src = iconFullyUrlTomorrow;

// // Day after tomorrow
// let iconCodeDAT = data.daily[1].weather[0].icon;
// let iconFullyUrlDAT = iconBaseUrl + iconCodeDAT + iconFormat;
// document.getElementById("wrapper-icon-dAT").src = iconFullyUrlDAT;

// // Icons hourly

// // Hour now
// let iconHourNow = data.hourly[0].weather[0].icon;
// let iconFullyUrlHourNow = iconBaseUrl + iconHourNow + iconFormat;
// document.getElementById(
// "wrapper-icon-hour-now"
// ).src = iconFullyUrlHourNow;

// // Hour1
// let iconHour1 = data.hourly[1].weather[0].icon;
// let iconFullyUrlHour1 = iconBaseUrl + iconHour1 + iconFormat;
// document.getElementById("wrapper-icon-hour1").src = iconFullyUrlHour1;

// // Hour2
// let iconHour2 = data.hourly[2].weather[0].icon;
// let iconFullyUrlHour2 = iconBaseUrl + iconHour2 + iconFormat;
// document.getElementById("wrapper-icon-hour2").src = iconFullyUrlHour1;

// // Hour3
// let iconHour3 = data.hourly[3].weather[0].icon;
// let iconFullyUrlHour3 = iconBaseUrl + iconHour3 + iconFormat;
// document.getElementById("wrapper-icon-hour3").src = iconFullyUrlHour3;

// // Hour4
// let iconHour4 = data.hourly[4].weather[0].icon;
// let iconFullyUrlHour4 = iconBaseUrl + iconHour4 + iconFormat;
// document.getElementById("wrapper-icon-hour4").src = iconFullyUrlHour4;

// // Hour5
// let iconHour5 = data.hourly[5].weather[0].icon;
// let iconFullyUrlHour5 = iconBaseUrl + iconHour5 + iconFormat;
// document.getElementById("wrapper-icon-hour5").src = iconFullyUrlHour5;

// // Backgrounds
// switch (main) {
// case "Snow":
// document.getElementById("wrapper-bg").style.backgroundImage =
// "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')";
// break;
// case "Clouds":
// document.getElementById("wrapper-bg").style.backgroundImage =
// "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
// break;
// case "Fog":
// document.getElementById("wrapper-bg").style.backgroundImage =
// "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')";
// break;
// case "Rain":
// document.getElementById("wrapper-bg").style.backgroundImage =
// "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
// break;
// case "Clear":
// document.getElementById("wrapper-bg").style.backgroundImage =
// "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
// break;
// case "Thunderstorm":
// document.getElementById("wrapper-bg").style.backgroundImage =
// "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')";
// break;
// default:
// document.getElementById("wrapper-bg").style.backgroundImage =
// "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
// break;
// }
// });
