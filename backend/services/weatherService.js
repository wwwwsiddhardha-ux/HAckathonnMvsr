const axios = require("axios");

const API_KEY = process.env.OPENWEATHER_API_KEY;

async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},IN&appid=${API_KEY}&units=metric`;
    const { data } = await axios.get(url);
    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      rain: data.rain ? (data.rain["1h"] || data.rain["3h"] || 0) : 0,
      condition: data.weather[0].main,
      description: data.weather[0].description,
    };
  } catch {
    return {
      temperature: 32,
      humidity: 65,
      rain: 0,
      condition: "Clear",
      description: "Weather data unavailable – using defaults",
    };
  }
}

module.exports = { getWeather };
