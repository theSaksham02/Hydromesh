const Emergency = require('../models/emergency.model');

const emergencyController = {
  // Create emergency request
  async createRequest(req, res, next) {
    try {
      const { latitude, longitude, description, priority } = req.body;

      const request = await Emergency.create({
        citizenId: req.user.userId,
        latitude,
        longitude,
        description,
        priority
      });

      res.status(201).json(request);
    } catch (error) {
      next(error);
    }
  },

  // Get pending requests
  async getPendingRequests(req, res, next) {
    try {
      const requests = await Emergency.getPendingRequests();
      res.json(requests);
    } catch (error) {
      next(error);
    }
  },

  // Accept request
  async acceptRequest(req, res, next) {
    try {
      const request = await Emergency.assignResponder(
        req.params.id,
        req.user.userId
      );
      res.json(request);
    } catch (error) {
      next(error);
    }
  },

  // Resolve request
  async resolveRequest(req, res, next) {
    try {
      const request = await Emergency.updateStatus(req.params.id, 'resolved');
      res.json(request);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = emergencyController;