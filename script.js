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
          const weatherBox = document.getElementById("weather-box");

          if (data.cod === '404') {
              document.getElementById('weather-info').innerHTML = `<p>City not found. Please try again.</p>`;
          } else {
             
              document.getElementById("display-city").innerText = `${data.name}, ${data.sys.country}`;

              
              const dateTime = new Date(data.dt * 1000);
              const options = { weekday: "short" };
              const dayOfWeek = dateTime.toLocaleDateString("en-US", options);
              const time = dateTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

              document.getElementById("display-date-time").innerText = `${dayOfWeek} ${time}`;

              
              document.getElementById("temperature").innerText = `${Math.round(data.main.temp)}°C`;

              
              const weatherIcon = data.weather[0].icon;
              document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

              
              document.getElementById("humidity").innerText = `${data.main.humidity}%`;
              document.getElementById("condition").innerText = data.weather[0].description;
              document.getElementById("wind-speed").innerText = `${data.wind.speed} km/h`;

             
              const rainChance = data.rain ? `${data.rain["1h"] || 0} mm` : "0 mm";
              document.getElementById("rain-chance").innerText = rainChance;

              
              if (data.weather[0].main === "Clear") {
                  weatherBox.style.backgroundImage = "url('https://images.unsplash.com/photo-1521747116042-d8f4e1b16f3b?fit=crop&w=800&h=600')";
              } else if (data.weather[0].main === "Rain") {
                  weatherBox.style.backgroundImage = "url('https://images.unsplash.com/photo-1501594907350-0549d6f10ff3?fit=crop&w=800&h=600')";
              } else if (data.weather[0].main === "Clouds") {
                  weatherBox.style.backgroundImage = "url('https://images.unsplash.com/photo-1541112703469-8f40bb779349?fit=crop&w=800&h=600')";
              } else {
                  weatherBox.style.backgroundImage = "url('https://images.unsplash.com/photo-1526994990252-0ec0a987607b?fit=crop&w=800&h=600')";
              }
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
