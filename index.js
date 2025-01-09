var selectedRow = null;
const baseURL = "http://api.jolpi.ca/ergast/f1/"

//show user alertrs
function showAlert(message, className){
    const dive = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
}
const LookupPress= document.addEventListener('LookupWeather');


function getWeather(){
    const apiKey = '';
    const city = document.getElementById('City').value;
    
    const currentWeatherUrl = ' ';
    const forecastURL = ' ';

    fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
    })
    .catch(error =>{
        console.error('Error fetching current weather data: ', error);
    });

    fetch(forecastURL)
    .then(response = response.json())
    .then(data => {
        displayHourlyForecast(data.list);
    })
    .catch(console.error('Error fetching hourly forecast'));


}

fetchSeasonData();
async function fetchSeasonData() {
    const Season = document.getElementById("Season").value;
    // const Team = document.getElementById("Team").value;
    // const Driver = document.getElementById("Driver").value;
    const responseSeason = await fetch(`http://api.jolpi.ca/ergast/f1/${Season}`)

    if(!responseSeason.ok){
        throw new Error("Could not fetch resource");
    }

    const data = await responseSeason.json();
    console.log(data);
}

