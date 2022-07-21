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
    document.querySelector("#temp-display").textContent =
    data.current.temp + "°F";
    document.querySelector("#city-display").textContent = inputs.value;
    document.querySelector("#humidity").textContent = "Humidity " + data.current.humidity + "%" ;
    document.querySelector("#wind-speed").textContent = "Wind Speed " + data.current.wind_speed + " mph ";
    document.querySelector("#uvindex").textContent = "UVI " + data.current.uvi;
    

    for (var i = 1; i < 6; i++) {
      document.querySelector("#temp" + i).textContent = data.daily[i].temp.day;
      // Forecast with Moment JS
      var forecast = moment().add(1, "days").calendar();
      console.log("forecast");
      forecastdaily.innerHTML = forecastdaily
 
    }
  });
}


//Local Storage
var storageInput = localStorage.getItem(inputs);
console.log(storageInput);
inputs = storageInput;

citysearch.addEventListener( "text", function () {
  console.log("text");

  var text = inputs.text.target.value;
  console.log(text);
  localStorage.setItem(text, inputs);
});
