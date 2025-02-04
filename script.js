document.addEventListener("DOMContentLoaded", function() {
    const cityInput = document.getElementById("city-input");
    const getWeatherButton = document.getElementById("get-weather");
  
    async function fetchWeather() {
        const city = cityInput.value;
        const apiKey = '03d99b715e24787f755c0f8d7c86b28f';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;      
  
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === '404') {
            document.getElementById('weather-info').innerHTML = `<p>City not found. Please try again.</p>`;
          } else {
        
            document.getElementById("display-city").innerText = data.name;
            
            const dateTime = new Date(data.dt * 1000);
            document.getElementById("display-date-time").innerText = dateTime.toLocaleString();
              
            document.getElementById("weather-info").innerHTML = `
              <h3>Weather in ${data.name}, ${data.sys.country}</h3>
              <p>Temperature: ${data.main.temp}°C</p>
              <p>Humidity: ${data.main.humidity}%</p>
              <p>Condition: ${data.weather[0].description}</p>
            `;
          }
        } catch (error) {
          document.getElementById("weather-info").innerHTML = `<p>Error fetching data. Please try again later.</p>`;
        }
      }
    
      getWeatherButton.addEventListener("click", fetchWeather);
      cityInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
          e.preventDefault();
          fetchWeather();
        }
      });
    });
    