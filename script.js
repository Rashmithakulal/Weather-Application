// script.js
document.getElementById('location-form').addEventListener('submit', getWeather);

async function getWeather(event) {
    event.preventDefault();
    
    const apiKey = '052f6d82164fa92e0ec6b5defa9e9df7'; // Replace with provided API key
    const locationInput = document.getElementById('location-input');
    const location = locationInput.value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === '404') {
            showError('Error: City not found');
        } else {
            showWeather(data);
        }
    } catch (error) {
        showError('Error fetching data. Please try again later.');
    }

    locationInput.value = ''; // Clear input field after form submission
}

function showWeather(data) {
    const weatherData = document.getElementById('weather-data');
    weatherData.innerHTML = `
        <div>
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        </div>
    `;
}

function showError(message) {
    const weatherData = document.getElementById('weather-data');
    weatherData.innerHTML = `<p id="error">${message}</p>`;
}
