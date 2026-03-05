const { query } = require('../config/database');

const Report = {
  // Create flood report
  async create({ userId, latitude, longitude, waterLevel, description, photoUrl, voiceUrl }) {
    const result = await query(
      `INSERT INTO flood_reports 
       (user_id, latitude, longitude, water_level, description, photo_url, voice_url, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       RETURNING *`,
      [userId, latitude, longitude, waterLevel, description, photoUrl, voiceUrl]
    );
    return result.rows[0];
  },

  // Get all reports
  async findAll(limit = 100) {
    const result = await query(
      `SELECT r.*, u.name as reporter_name
       FROM flood_reports r
       JOIN users u ON r.user_id = u.user_id
       ORDER BY r.created_at DESC
       LIMIT $1`,
      [limit]
    );
    return result.rows;
  },

  // Get reports within radius (PostGIS)
  async findNearby(latitude, longitude, radiusKm = 5) {
    const result = await query(
      `SELECT *, 
       ST_Distance(
         ST_MakePoint(longitude, latitude)::geography,
         ST_MakePoint($2, $1)::geography
       ) / 1000 as distance_km
       FROM flood_reports
       WHERE ST_DWithin(
         ST_MakePoint(longitude, latitude)::geography,
         ST_MakePoint($2, $1)::geography,
         $3 * 1000
       )
       ORDER BY created_at DESC`,
      [latitude, longitude, radiusKm]
    );
    return result.rows;
  },

  // Get report by ID
  async findById(reportId) {
    const result = await query(
      'SELECT * FROM flood_reports WHERE report_id = $1',
      [reportId]
    );
    return result.rows[0];
  }
};

module.exports = Report;