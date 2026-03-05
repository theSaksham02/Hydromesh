const { query } = require('../config/database');

const Emergency = {
  // Create emergency request
  async create({ citizenId, latitude, longitude, description, priority = 'medium' }) {
    const result = await query(
      `INSERT INTO emergency_requests 
       (citizen_id, latitude, longitude, description, priority, status, created_at)
       VALUES ($1, $2, $3, $4, $5, 'pending', NOW())
       RETURNING *`,
      [citizenId, latitude, longitude, description, priority]
    );
    return result.rows[0];
  },

  // Find nearby responders
  async findNearbyResponders(latitude, longitude, radiusKm = 10) {
    const result = await query(
      `SELECT u.user_id, u.name, u.phone,
       ST_Distance(
         ST_MakePoint(l.longitude, l.latitude)::geography,
         ST_MakePoint($2, $1)::geography
       ) / 1000 as distance_km
       FROM users u
       JOIN user_locations l ON u.user_id = l.user_id
       WHERE u.role = 'responder'
       AND ST_DWithin(
         ST_MakePoint(l.longitude, l.latitude)::geography,
         ST_MakePoint($2, $1)::geography,
         $3 * 1000
       )
       ORDER BY distance_km ASC`,
      [latitude, longitude, radiusKm]
    );
    return result.rows;
  },

  // Assign responder
  async assignResponder(requestId, responderId) {
    const result = await query(
      `UPDATE emergency_requests 
       SET responder_id = $2, status = 'assigned', assigned_at = NOW()
       WHERE request_id = $1
       RETURNING *`,
      [requestId, responderId]
    );
    return result.rows[0];
  },

  // Update status
  async updateStatus(requestId, status) {
    const result = await query(
      `UPDATE emergency_requests 
       SET status = $2, resolved_at = CASE WHEN $2 = 'resolved' THEN NOW() ELSE NULL END
       WHERE request_id = $1
       RETURNING *`,
      [requestId, status]
    );
    return result.rows[0];
  },

  // Get pending requests for responders
  async getPendingRequests() {
    const result = await query(
      `SELECT e.*, u.name as citizen_name, u.phone as citizen_phone
       FROM emergency_requests e
       JOIN users u ON e.citizen_id = u.user_id
       WHERE e.status = 'pending'
       ORDER BY e.created_at ASC`
    );
    return result.rows;
  }
};

module.exports = Emergency;