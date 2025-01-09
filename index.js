// var selectedRow = null;
// const baseURL = "http://api.jolpi.ca/ergast/f1/"

// //show user alertrs
// function showAlert(message, className){
//     const dive = document.createElement("div");
//     div.className = `alert alert-${className}`;

//     div.appendChild(document.createTextNode(message));
//     const container = document.querySelector(".container");
// }
// const LookupPress= document.addEventListener('LookupWeather');


// function getWeather(){
//     const apiKey = '';
//     const city = document.getElementById('City').value;
    
//     const currentWeatherUrl = ' ';
//     const forecastURL = ' ';

//     fetch(currentWeatherUrl)
//     .then(response => response.json())
//     .then(data => {
//         displayWeather(data);
//     })
//     .catch(error =>{
//         console.error('Error fetching current weather data: ', error);
//     });

//     fetch(forecastURL)
//     .then(response = response.json())
//     .then(data => {
//         displayHourlyForecast(data.list);
//     })
//     .catch(console.error('Error fetching hourly forecast'));


// }

// fetchSeasonData();
// async function fetchSeasonData() {
//     const Season = document.getElementById("Season").value;
//     // const Team = document.getElementById("Team").value;
//     // const Driver = document.getElementById("Driver").value;
//     const responseSeason = await fetch(`http://api.jolpi.ca/ergast/f1/${Season}`)

//     if(!responseSeason.ok){
//         throw new Error("Could not fetch resource");
//     }

//     const data = await responseSeason.json();
//     console.log(data);
// }
function getWeather() {
    const apiKey = '4321073b29c430eb214d8ba5884902f5';
    const city = document.getElementById('City').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
// // `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    
    fetch(currentWeatherUrl)
    .then(response => {
        // Log the response for debugging
        console.log('Response:', response);

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json(); // Parse JSON if response is OK
    })
    .then(data => {
        console.log('Weather data:', data); // Log data for debugging
        displayWeather(data); // Call your function to display data
    })
    .catch(error => {
        console.error('Error fetching current weather data:', error);
        alert('Error fetching current weather data. Please try again later.');
    });

   
   
    // fetch(currentWeatherUrl)
    //     .then(response => response.json())
    //     .then(data => {
    //         displayWeather(data);
    //     })
    //     .catch(error => {
    //         console.error('Error fetching current weather data:', error);
    //         alert('Error fetching current weather data. Please try again.');
    //     });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}
