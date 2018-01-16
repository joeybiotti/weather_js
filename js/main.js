console.log("main.js loaded");

//Api Key
const apiKey = wxKey; //API KEY STORED IN 'js/creds/apiCreds.js

//Get location form
let locationForm = document.getElementById('weather-form');

locationForm.addEventListener('submit', forecast);

function forecast(e){
    //prevent default-- no actual submit.
    e.preventDefault();

    let location = document.getElementById('weather-input').value;

    axios.get('http://api.wunderground.com/api/'+apiKey+'/geolookup/conditions/q/'+location+'.json',{
        params:{
            location: location,
            key: apiKey
        }
    })
    .then(function(response){
        //log complete response
        console.log(response);

        //Location Info
        let locationInfo = response.data.current_observation.display_location.full;
        console.log(locationInfo);

        let locationOutput =   `<h2 class="text-center text-success"><strong>${locationInfo}</strong></h2>`;

        //Weather Info
        let weatherInfo = response.data.current_observation.feelslike_string;
        console.log(weatherInfo);

        let weatherReport = `<h3 class="text-center text-success">${weatherInfo}</h3>`

        //Weather Img
        let weatherImg = response.data.current_observation.icon_url;

        let weatherImage = `<img src="${weatherImg}" alt="weather image"/>`;

        //Local Time
        let localTime = response.data.current_observation.observation_time;
        console.log(localTime);

        let time = `<h6 class="text-center text-success">${localTime}</h6>`;

        //Output to DOM
        document.getElementById('location-output').innerHTML = locationOutput;
        document.getElementById('weather-output').innerHTML = weatherReport;
        document.getElementById('weather-icon').innerHTML = weatherImage;
        document.getElementById('time-output').innerHTML = time;
    })
    .catch(function(error){
        console.log(error);
    })
};

//Get Tomorrow's Weather Form
let forecastForm = document.getElementById('forecast-form');

forecastForm.addEventListener('submit', threeDayForecast);
function threeDayForecast(e){
    e.preventDefault();

    let forecastLocation = document.getElementById('forecast-input').value;
    console.log(forecastLocation);

    axios.get('http://api.wunderground.com/api/'+ apiKey +'/forecast/q/'+ forecastLocation + '.json', {
        params: {
            location: location,
            key: apiKey
        }
    })
    .then(function(response){
       console.log('Forecast response: ', response);

       let forecastOutput = `<h2 class="text-center text-success card-title"><strong>Tomorrow's Weather</strong></h2>`;

       let forecastInfo = response.data.forecast.txt_forecast.forecastday[2].fcttext;
       let forecastDay = response.data.forecast.txt_forecast.forecastday[2].title;
       let forecastIcon = response.data.forecast.txt_forecast.forecastday[2].icon_url;

       const threeDayForecastOutput = `
            <div>
                <h4 class="text-center text-success"><u>${forecastDay}</u></h4>
                <img class="rounded mx-auto d-block" src="${forecastIcon}" alt="Forecast Icon"/>
                <h6 class="text-center">${forecastInfo}</h6>
            </div>
        `;

       document.getElementById('forecast-output').innerHTML = forecastOutput;
       document.getElementById('three-day-forecast').innerHTML = threeDayForecastOutput;

    })
    .catch(function(error){
        console.log('Forecast error: ', error);
    })
};
