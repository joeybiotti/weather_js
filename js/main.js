console.log("main.js loaded");


//Get location form
let locationForm = document.getElementById('weather-form');

locationForm.addEventListener('submit', forecast);

function forecast(e){
    //prevent default-- no actual submit.
    e.preventDefault();

    let location = document.getElementById('weather-input').value;
    let apiKey = ''; //API KEY GOES HERE.

    axios.get('http://api.wunderground.com/api/'+apiKey+'/geolookup/conditions/q/'+location+'.json',{
        params:{
            location: location
        }
    })
    .then(function(response){
        //log complete response
        console.log(response);

        //Location Info
        let locationInfo = response.data.current_observation.display_location.full;
        console.log(locationInfo);

        let locationOutput =   `<h2 class="text-center text-success"><strong>${locationInfo}</strong></h2>`

        //Weather Info
        let weatherInfo = response.data.current_observation.feelslike_string;
        console.log(weatherInfo);

        let weatherReport = `<h3 class="text-center text-success">${weatherInfo}</h3>`

        //Weather Img
        let weatherImg = response.data.current_observation.icon_url;

        let weatherImage = `<img src="${weatherImg}" alt="weather image"/>`

        //Local Time
        let localTime = response.data.current_observation.observation_time;
        console.log(localTime);

        let time = `<h6 class="text-center text-success">${localTime}</h6>`

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