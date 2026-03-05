const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weather.controller');

// Get current weather
router.get('/current', weatherController.getCurrentWeather);

// Get forecast
router.get('/forecast', weatherController.getForecast);

module.exports = router;