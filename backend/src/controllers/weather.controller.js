const axios = require('axios');

const DEFAULT_WEATHER_API = 'https://api.open-meteo.com/v1';
let WEATHER_API = DEFAULT_WEATHER_API;
try {
  const envUrl = process.env.WEATHER_API_URL;
  if (envUrl && envUrl.startsWith('http')) {
    new URL(envUrl); // validate
    WEATHER_API = envUrl;
  }
} catch { WEATHER_API = DEFAULT_WEATHER_API; }

const weatherController = {
  // Get current weather
  async getCurrentWeather(req, res, next) {
    try {
      const { latitude, longitude } = req.query;

      if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and longitude required' });
      }

      const response = await axios.get(`${WEATHER_API}/forecast`, {
        params: {
          latitude,
          longitude,
          current_weather: true,
          hourly: 'precipitation,rain'
        }
      });

      res.json(response.data);
    } catch (error) {
      next(error);
    }
  },

  // Get forecast
  async getForecast(req, res, next) {
    try {
      const { latitude, longitude } = req.query;

      if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and longitude required' });
      }

      const response = await axios.get(`${WEATHER_API}/forecast`, {
        params: {
          latitude,
          longitude,
          daily: 'precipitation_sum,rain_sum,precipitation_probability_max',
          timezone: 'auto'
        }
      });

      res.json(response.data);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = weatherController;