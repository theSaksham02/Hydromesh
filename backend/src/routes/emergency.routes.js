const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergency.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Create emergency request
router.post('/', authMiddleware, emergencyController.createRequest);

// Get pending requests (for responders)
router.get('/pending', authMiddleware, emergencyController.getPendingRequests);

// Accept request
router.post('/:id/accept', authMiddleware, emergencyController.acceptRequest);

// Resolve request
router.post('/:id/resolve', authMiddleware, emergencyController.resolveRequest);

module.exports = router;