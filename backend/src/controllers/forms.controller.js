const FormSubmission = require('../models/form.model');

const formsController = {
  // POST /api/forms/newsletter
  async subscribeNewsletter(req, res, next) {
    try {
      const { firstName, lastName, email } = req.body;

      if (!firstName || !lastName || !email) {
        return res.status(400).json({
          success: false,
          message: 'First name, last name, and email are required.',
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address.',
        });
      }

      const record = await FormSubmission.subscribeNewsletter({
        firstName,
        lastName,
        email,
      });

      return res.status(201).json({
        success: true,
        message: 'Successfully subscribed to the HydroMesh resilience network.',
        data: {
          id: record.id,
          firstName: record.first_name,
          email: record.email,
          createdAt: record.created_at,
          storedOn: 'supabase',
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/forms/pilot
  async submitPilot(req, res, next) {
    try {
      const { agency, city, email, notes } = req.body;

      if (!agency || !city || !email) {
        return res.status(400).json({
          success: false,
          message: 'Agency name, city/jurisdiction, and official email are required.',
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address.',
        });
      }

      const record = await FormSubmission.submitPilot({
        agency,
        city,
        email,
        notes,
      });

      return res.status(201).json({
        success: true,
        message: 'Pilot deployment application successfully submitted to HydroMesh.',
        data: {
          id: record.id,
          agency: record.agency,
          city: record.city,
          email: record.email,
          status: record.status,
          createdAt: record.created_at,
          storedOn: 'supabase',
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/forms/contact
  async submitContact(req, res, next) {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and message are required.',
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address.',
        });
      }

      const record = await FormSubmission.submitContact({
        name,
        email,
        message,
      });

      return res.status(201).json({
        success: true,
        message: 'Message delivered and stored in Supabase database.',
        data: {
          id: record.id,
          name: record.name,
          email: record.email,
          status: record.status,
          createdAt: record.created_at,
          storedOn: 'supabase',
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/forms/stats
  async getStats(req, res, next) {
    try {
      const stats = await FormSubmission.getStats();
      return res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = formsController;
