//api key:062c7dca4b324ae41a41ee73c66e4fce

//Elements
const iconElement = document.getElementById(".weather-icon")
const tempElement = document.getElementById(".temperature-value")
const descElement = document.getElementById(".temperature-description")
const locationElement = document.getElementById(".location")
const notificationElement = document.getElementById(".notification")
const buttonElement = document.getElementById("submit")
const inputValue = document.getElementById("inputValue")
const locationElementS = document.getElementById("locationS")
const iconElementS = document.getElementById("weather-iconS")
const tempElementS = document.getElementById("temperature-valueS")
const descElementS = document.getElementById("temperature-descriptionS")


//Data
const weather = {};

weather.temprature = {
    unit: "celsius"
}

//const and vals

const KELVIN = 273;

//get local position

window.addEventListener("load",() => {
    let lat; 
    let lon; 

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(setPosition => {
            lon = setPosition.coords.longitude;
            lat = setPosition.coords.latitude;
        });
    } 
});


//local weather from api

function getWeather(lat, lon){
    fetch (`https://api.openweathermap.org/data/2.5/weather?lat=`+ {lat} + `&lon=`+ {lon} +`&appid=062c7dca4b324ae41a41ee73c66e4fce`)
        .then(response => response.json())
        .then(data => console.log(data))
        
        .then(function(data){
            weather.temprature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

function displayWeather(){
    iconElement.innerHTML = `<img src= "assets/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temprature.value}° <span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;

}

//selected location

   buttonElement.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=062c7dca4b324ae41a41ee73c66e4fce')
    .then(response => response.json())
    .then(data => {
        var iconValue = data.weather[0].icon;
        var locationValue = data.name;
        var tempValue = Math.floor(data.main.temp - KELVIN);
        var descValue = data['weather'][0]['description'];

        locationElementS.innerHTML = locationValue;
        tempElementS.innerHTML = tempValue;
        descElementS.innerHTML = descValue;
        iconElementS.innerHTML = `<img src= "assets/${iconValue}.png"/>`;
    })
    
.catch(err => alert("Invalid City Name"))
})

