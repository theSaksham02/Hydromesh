const express = require('express');
const router = express.Router();
const simulationController = require('../controllers/simulation.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Trigger a simulation run (protected route, but for prototype we allow any authenticated user)
router.post('/run', authMiddleware, simulationController.runSimulation);

module.exports = router;