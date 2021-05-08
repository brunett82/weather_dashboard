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

//Weather function
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
        
    fetch("https://api.openweathermap.org/data/2.5/uvi?appid=957c1d427eb08dc32b2d83caeea47227&lat=" + data.coord.lat + "&lon=" + data.coord.lon)
    .then(function (getUV) {
        return getUV.json();
    })
   
    .then(function (idxResp) {
        var uvWrite = $(`<p>UV Index: <span id='indexColor' class='p-2'>${idxResp.value}</span></p>`);
        $("#todayWeather").append(uvWrite);
    
    if (idxResp.value <= 3) {
        $("#indexColor").css("background-color", "green").css("color", "blue");
        
        } else if(idxResp.value >= 3.1 && idxResp.value <=5){
            $("#indexColor").css("background-color", "yellow").css("color", "blue");
        } else if (idxResp.value >= 5.1 && idxResp.value <=7.5){
            $("#indexColor").css("background-color", "orange").css("color", "blue");
        } else if (idxResp.value >= 7.6 && idxResp.value <=10); {
            $("#indexColor").css("background-color", "red").css("color", "white");
        };
        })  
    
    return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=957c1d427eb08dc32b2d83caeea47227&units=imperial")  
    .then (function (fvDay){
        return fvDay.json();
    }) 
    .then (function (fvDay) {
    for (let i = 1; i < 6; i++) {
            var fcstCard = document.createElement("div");
            var dateDiv = document.createElement("div");
            var fcstDate = moment(fvDay.daily[i].dt * 1000).format("MM-DD-YYYY");
            var iconDiv = document.createElement("div");
            var tempDiv = document.createElement("div");
            var humidDiv = document.createElement("div");

            fcstCard.classList = "flex-card mx-2 px-2 border-dark bg-info text-light";
            
            dateDiv.classList = "secondary-text card-title";
            dateDiv.innerHTML = "<h4 class='font-weight-bold'>" + fcstDate + "</h4>";
            
            iconDiv.innerHTML = "<img src='https://openweathermap.org/img/w/" + fvDay.daily[i].weather[0].icon + ".png 'class='forecast-icon' alt=Current weather icon/>";
            
            tempDiv.classList = "card-text secondary-text";
            tempDiv.innerHTML = "<h6>Day Temp:<span>" + " " + Math.round(fvDay.daily[i].temp.day) + "&#176F</span></h6>" + "<h6>Night Temp:<span>" + " " + Math.round(fvDay.daily[i].temp.night) + "&#176F</span></h6>";
            
            humidDiv.classList = "card-text secondary-text";
            humidDiv.innerHTML = "<h6>Humidity:<span>" + " " + fvDay.daily[i].humidity + "%</span></h6>";
            
            $('#fiveWeath').append(fcstCard);
            fcstCard.append(dateDiv);
            fcstCard.append(iconDiv);
            fcstCard.appendChild(tempDiv);
            fcstCard.appendChild(humidDiv);
            }
        })
    })
};









//Search button functionality
$('#button').on('click', function(event) {
    event.preventDefault();
    var locale = $('#searchField').val().trim();
    curWeather(locale);
    
})