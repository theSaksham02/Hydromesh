const express = require('express');
const router = express.Router();
const formsController = require('../controllers/forms.controller');

// Newsletter subscription
router.post('/newsletter', formsController.subscribeNewsletter);
router.post('/subscribe', formsController.subscribeNewsletter);

// Pilot intake
router.post('/pilot', formsController.submitPilot);
router.post('/join', formsController.submitPilot);

// Contact message
router.post('/contact', formsController.submitContact);
router.post('/message', formsController.submitContact);

// Form stats
router.get('/stats', formsController.getStats);

module.exports = router;
