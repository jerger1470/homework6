//api key:062c7dca4b324ae41a41ee73c66e4fce

//Elements
const iconElement = document.getElementById("weather-icon")
const tempElement = document.getElementById("temperature-value")
const descElement = document.getElementById("temperature-description")
const locationElement = document.getElementById("location")
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
    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(setPosition => {
             
           let lon = setPosition.coords.longitude;
           let lat = setPosition.coords.latitude;

           getWeather(lat, lon);
        });
    } 
});


//local weather from api

function getWeather(lat, lon){
    fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=062c7dca4b324ae41a41ee73c66e4fce`)
    .then(response => response.json())
    .then(data => {
        var iconValue = data.weather[0].icon;
        var locationValue = data.name;
        var tempValue = Math.floor(data.main.temp - KELVIN);
        var descValue = data['weather'][0]['description'];

        locationElement.innerHTML = locationValue;
        tempElement.innerHTML = tempValue;
        descElement.innerHTML = descValue;
        iconElement.innerHTML = `<img src= "assets/${iconValue}.png"/>`;
        })
        
}



//selected location

   buttonElement.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=062c7dca4b324ae41a41ee73c66e4fce')
    .then(response => response.json())
    .then(data => {
        var iconValueS = data.weather[0].icon;
        var locationValueS = data.name;
        var tempValueS = Math.floor(data.main.temp - KELVIN);
        var descValueS = data['weather'][0]['description'];

        locationElementS.innerHTML = locationValueS;
        tempElementS.innerHTML = tempValueS;
        descElementS.innerHTML = descValueS;
        iconElementS.innerHTML = `<img src= "assets/${iconValueS}.png"/>`;
    })
    
.catch(err => alert("Invalid City Name"))
})

