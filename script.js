getWeatherButton = document.getElementById("get-weather");
cityInput = document.getElementById("city-input");

async function fetchWeatherByCity() {
    const city = cityInput.value;
    const apiKey = '03d99b715e24787f755c0f8d7c86b28f';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            document.getElementById('weather-info').innerHTML = `<p>City not found. Please try again.</p>`;
        } else {
            populateWeatherData(data);
        }
    } catch (error) {
        document.getElementById("weather-info").innerHTML = `<p>Error fetching data. Please try again later.</p>`;
    }
}

async function fetchWeatherByLocation(lat, lon) {
  const apiKey = '03d99b715e24787f755c0f8d7c86b28f';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === '404') {
          alert("Location not found. Please try again.");
      } else {
          populateWeatherData(data);
      }
  } catch (error) {
      alert("Error fetching data. Please try again later.");
  }
}

function populateWeatherData(data){
    document.getElementById("display-city").innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById("display-date-time").innerText = new Date(data.dt * 1000).toLocaleString("en-US", { weekday: "short", hour: "2-digit", minute: "2-digit", hour12: true });

    const tempF = Math.round(data.main.temp); 
    document.getElementById("temperature").innerText = `${tempF}°F`; 
    document.getElementById("humidity-display").innerText = `${data.main.humidity}%`;
    document.getElementById("condition-display").innerText = data.weather[0].description;
    document.getElementById("wind-speed-display").innerText = `${data.wind.speed} km/h`;

    const rainChance = data.rain ? `${data.rain["1h"] || 0} mm` : "0 mm";
    document.getElementById("rain-chance-display").innerText = rainChance;

    const iconCode = data.weather[0].icon;
    // Icon image URL
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // This gives the user the option to toggle between Celsius and Fahrenheit
    let isCelsius = false; // Set the default to Fahrenheit
    document.getElementById("toggle-temp").onclick = function() {
        isCelsius = !isCelsius;
        const tempC = Math.round((tempF - 32) * 5 / 9); 
        document.getElementById("temperature").innerText = isCelsius ? `${tempC}°C` : `${tempF}°F`;
    }
}

// Function to get user current location
function getLocationAndFetchWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByLocation(lat, lon); 
        }, function() {
            alert("Geolocation is not supported by this browser or permission is denied.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
  }

window.onload = function() {
  getLocationAndFetchWeather();
};

getWeatherButton.addEventListener("click", fetchWeatherByCity);
cityInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        fetchWeatherByCity();
    }

    const weatherIcon = document.getElementById('weather-icon');
      weatherIcon.src = iconUrl;
      weatherIcon.style.display = 'inline'; 

});