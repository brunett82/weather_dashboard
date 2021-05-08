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
var city = [];
//Weather function
function curWeather(location) {
    var qUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=957c1d427eb08dc32b2d83caeea47227`;
     
    fetch(qUrl)
    .then(function(response) {
        return response.json(); 
    })
    .then(function (data){
        var icon = data.weather[0].icon;
        var iUrl = `https://openweathermap.org/img/wn/${icon}.png`;
        var cityData = $(`
                    <h3> ${date}: <br>${data.name}  <img id="primeIcon" src="${iUrl}" alt="${data.weather[0].description}"</h3>
                    <p> Current Temp: ${data.main.temp}\u00B0 F </p>
                    <p> Wind Speed:  ${data.wind.speed} mph </p>
                    <p> Humidity: ${data.main.humidity} \% </p>`);
       
        $("#todayWeather").append(cityData);
        
    fetch("https://api.openweathermap.org/data/2.5/uvi?appid=957c1d427eb08dc32b2d83caeea47227&lat=" + data.coord.lat + "&lon=" + data.coord.lon)
    .then(function (getUV) {
        return getUV.json();
    })
   
    .then(function (idxResp) {
        var uvWrite = $(`<p class='uv'>UV Index: <span id='indexColor' class='p-2'>${idxResp.value}</span></p>`);
        $("#todayWeather").append(uvWrite);
        
        var uV = idxResp.value;
        if (uV > 7 && uV < 10); {
            $("#indexColor").css("background-color", "red").css("color", "white");
        }
        if (uV > 5 && uV < 7){
            $("#indexColor").css("background-color","orange").css("color", "black");
        }
        if(uV > 3 && uV < 5){
            $("#indexColor").css({"background-color":"yellow","color":"black"});
        }      
        if (uV < 3) {
        $("#indexColor").css("background-color", "green").css("color", "black");
        
        } ;
        })  
    
    return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=957c1d427eb08dc32b2d83caeea47227&units=imperial")  
    .then (function (fvDay){
        return fvDay.json();
    }) 
    .then (function (fvDay) {
    for (let i = 1; i < 6; i++) {
            var fcstCard = document.createElement("div");
            var dateDiv = document.createElement("div");
            var fcstDate = moment(fvDay.daily[i].dt * 1000).format("M/D");
            var iconDiv = document.createElement("div");
            var tempDiv = document.createElement("div");
            var humidDiv = document.createElement("div");

            fcstCard.classList = "fcstCard flex-card mx-2 px-2 border-dark text-light";
                        
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
function loadStorage() {
    var savedPlaces = localStorage.getItem("Cities");

    if (savedPlaces) {
        city = JSON.parse(savedPlaces);
        city.reverse();
        displayCityBtn();
        curWeather(city[0]);
    }
};
function displayCityBtn() {
    $("#searchHistory").empty();
    for (var i = 0; i < city.length; i++){
        var newBtn = $("<button>");
        newBtn.attr("type", "button");
        newBtn.attr("class", "list-group-item list-group-item-action cityBtn");
        newBtn.attr("data-cityName", city[i]);
        newBtn.text(city[i])

        $("#searchHistory").append(newBtn);
    }
    localStorage.setItem("Cities", JSON.stringify(city));
};
    $("#button").on("click",function(event){
		
		var location = $("#searchField").val();
		
		city.push(location);
		
		displayCityBtn();
		curWeather(location);
	});
	$(document).on("click", ".cityBtn", function() {
        $("#todayWeather").empty();
        $("#fiveWeath").empty();
		curWeather($(this).attr("data-cityName"));
	});
	loadStorage();