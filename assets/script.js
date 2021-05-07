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

var date = moment().format("L");

var key = '957c1d427eb08dc32b2d83caeea47227'




//Current Weather function//

function curWeather(locale) {
    var qUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locale}&units=imperial&appid=957c1d427eb08dc32b2d83caeea47227`;
     
    fetch(qUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function (data){
        var icon = data.weather[0].icon;
        var iUrl = `https://openweathermap.org/img/wn/${icon}.png`;
        var cityData = $(`
                    <h3> ${data.name}  ${date} <img src="${iUrl}" alt="${data.weather[0].description}"</h3>
                    <p> Current Temp: ${data.main.temp}\u00B0 F </p>
                    <p> Wind Speed:  ${data.wind.speed} mph </p>
                    <p> Humidity: ${data.main.humidity} \% </p>`);
                    console.log('data', data);
       
        $("#todayWeather").append(cityData);
        
    var lat = data.coord.lat;
    var lon = data.coord.lon;  
    var indexUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=957c1d427eb08dc32b2d83caeea47227`;  
    /*
    fetch(indexUrl)
    .then(function (uvResponse) {
        return uvResponse.json();
    })
   
    .then(function (uvData) {
       
        var uvResult = uvData.value;
        var uvWrite = $(`<p>UV Index: <span id='indexColor' class='p-2'>${uvResult}</span></p>`);
        
        $("#todayWeather").append(uvWrite);
    });
    if (uvResult <= 3) {
        $("#indexColor").css("background-color", "green").css("color", "blue");
        
        } else if(uvResult >= 3.1 && uvResult <=5){
            $("#indexColor").css("background-color", "yellow").css("color", "blue");
        } else if (uvResult >= 5.1 && uvResult <=7.5){
            $("#indexColor").css("background-color", "orange").css("color", "blue");
        } else if (uvResult >= 7.6 && uvResult <=10); {
            $("#indexColor").css("background-color", "red").css("color", "white");
        };*/
    });
   
    
};


//Search button functionality
$('#button').on('click', function(event) {
    event.preventDefault();
    var locale = $('#searchField').val().trim();
    curWeather(locale);

})