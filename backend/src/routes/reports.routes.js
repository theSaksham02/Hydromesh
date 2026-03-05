const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reports.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Get all reports
router.get('/', reportsController.getAllReports);

// Get nearby reports
router.get('/nearby', reportsController.getNearbyReports);

// Get single report
router.get('/:id', reportsController.getReportById);

// Create report (protected)
router.post('/', authMiddleware, reportsController.createReport);

module.exports = router;