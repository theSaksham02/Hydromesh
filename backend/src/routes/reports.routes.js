const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reports.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { validateCreateReport, validateNearbyQuery, validateIdParam } = require('../middleware/validate.middleware');

// Get all reports
router.get('/', reportsController.getAllReports);

// Get nearby reports
router.get('/nearby', validateNearbyQuery, reportsController.getNearbyReports);

// Get single report
router.get('/:id', validateIdParam, reportsController.getReportById);

// Create report (protected + validated)
router.post('/', authMiddleware, validateCreateReport, reportsController.createReport);

// Clear all reports (for demo testing cleanup)
router.delete('/clear-all', require('../controllers/simulation.controller').stopSimulation);
router.post('/clear-all', require('../controllers/simulation.controller').stopSimulation);

module.exports = router;