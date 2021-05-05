/*Pseudo Code:
1. Get current date with moment.js
2. Enable user-input search functionality with on-click event.
3. Capture search history in local storage
4. Render search history to individual search buttons from local storage.
5. Get API weather data for current day.
    3A. Create an object to contain the data (city, temp, humidity, windspeed, UV index, and weather Icon).
6. Get API weather data for five day forecast.
    4A. Create an object to contain the data (city, temp, humidity, windspeed, UV index, and weather Icon).
7. Render current day forecast data from object to primary box.
8. Render 5 day forecast data to individual cards.*/

var today = moment().format("L");
var locale = $('#searchField').val().trim();
var key = '213af9b7d597899a5c6f22af5ed57261'
var qUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locale}&appid=${key}`;
var icon = wResponse.weather[0].icon;
var iUrl = `https://openweathermap.org/img/w/${icon}.png`

//Current Weather function//

function curWeather(locale) {
    $.ajax({
        url: qUrl,
        method: 'GET'
    }).then(function(wResponse) {

    })
}


//Search button functionality
$('#button').on('click', function(event) {
    event.preventDefault();


})