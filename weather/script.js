const searchButton = document.querySelector(".search-icon");
const resultCity = document.querySelector("#city");
const windIcon = document.querySelector("#windSpeed");
const tempIcon = document.querySelector("#temperature");
const humidityIcon = document.querySelector("#humidity");
const container = document.querySelector(".container");
const unsplashApiKey = "OdlfaIPAUT8YNwMEt2twCZolgS4k55MRC9-2b8oTW18";
const apiKey = "b371de34763c1cb23f448832e3d91e81";
const geoCodeBaseUrl = "http://api.openweathermap.org/geo/1.0/direct";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";

setBackground();

searchButton.addEventListener("click", () => {

  const searchInput = document.querySelector(".search input");
  const cityName = searchInput.value.trim();
  
  if (!cityName) {
    alert("Please enter a city name!");
    return;
  }

  setBackgroundByCity(cityName);

  const geoCodeUrl = `${geoCodeBaseUrl}?q=${cityName}&appid=${apiKey}`;

  fetch(geoCodeUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found!");
      }
      return response.json();
    })
    .then(data => {
      const { lat, lon } = data[0];
      return fetch(`${weatherApiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Weather data not available!");
      }
      return response.json();
    })
    .then(weatherData => {
      updateUI(weatherData);
    })
    .catch(error => {
      console.error("Error:", error.message);
      alert("An error occurred. Please try again later.");
    });
});

function updateUI(weatherData) {
  resultCity.textContent = weatherData.name.toUpperCase();
  windIcon.textContent = ` ${weatherData.wind.speed} m/s`;
  tempIcon.textContent = ` ${weatherData.main.temp} C`;
  humidityIcon.textContent = ` ${weatherData.main.humidity} %`;
}


async function fetchRandomImage() {

  const url = `https://api.unsplash.com/photos/random?client_id=${unsplashApiKey}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }
    const data = await response.json();
    return data.urls.regular;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

async function fetchRandomImageByCity(cityName) {

  const searchQuery = encodeURIComponent(cityName);
  const url = `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${unsplashApiKey}&orientation=landscape&per_page=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }
    const data = await response.json();
    if (data.results.length === 0) {
      throw new Error("No images found for the city");
    }
    return data.results[0].urls.regular;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

async function setBackground() {
  const imageUrl = await fetchRandomImage();
  if (imageUrl) {
    container.style.backgroundImage = `url(${imageUrl})`;
    container.style.backgroundSize = "cover";
    container.style.backgroundPosition = "center";
  } else {
    container.style.backgroundImage = "none";
  }
}

async function setBackgroundByCity(cityName) {
  const imageUrl = await fetchRandomImageByCity(cityName);
  if (imageUrl) {
    container.style.backgroundImage = `url(${imageUrl})`;
    container.style.backgroundSize = "cover";
    container.style.backgroundPosition = "center";
  } else {
    container.style.backgroundImage = "none";
  }
}

