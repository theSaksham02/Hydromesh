const Report = require('../models/report.model');
const { getIO } = require('../config/socket');

const reportsController = {
  // Get all reports
  async getAllReports(req, res, next) {
    try {
      const reports = await Report.findAll();
      res.json(reports);
    } catch (error) {
      next(error);
    }
  },

  // Get nearby reports
  async getNearbyReports(req, res, next) {
    try {
      const { latitude, longitude, radius = 5 } = req.query;
      
      if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and longitude required' });
      }

      const reports = await Report.findNearby(
        parseFloat(latitude),
        parseFloat(longitude),
        parseFloat(radius)
      );
      res.json(reports);
    } catch (error) {
      next(error);
    }
  },

  // Get single report
  async getReportById(req, res, next) {
    try {
      const report = await Report.findById(req.params.id);
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
      res.json(report);
    } catch (error) {
      next(error);
    }
  },

  // Create report
  async createReport(req, res, next) {
    try {
      const { latitude, longitude, waterLevel, description, photoUrl, voiceUrl } = req.body;

      const report = await Report.create({
        userId: req.user.userId,
        latitude,
        longitude,
        waterLevel,
        description,
        photoUrl,
        voiceUrl
      });

      // Emit to all connected clients
      const io = getIO();
      io.emit('new_report', report);

      res.status(201).json(report);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = reportsController;