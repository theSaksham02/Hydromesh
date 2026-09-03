const express = require('express');
const router = express.Router();
const simulationController = require('../controllers/simulation.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Trigger a simulation run (protected route, but for prototype we allow any authenticated user)
router.post('/run', authMiddleware, simulationController.runSimulation);

// Stop simulation and clear test activities
router.post('/stop', simulationController.stopSimulation);

module.exports = router;