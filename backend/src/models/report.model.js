const { query, useRest } = require('../config/database');
const { getSupabase } = require('../config/supabase');

const Report = {
  async create({ userId, latitude, longitude, waterLevel, description, photoUrl, voiceUrl }) {
    if (useRest) {
      const sb = getSupabase();
      const { data, error } = await sb.from('flood_reports').insert({
        user_id: userId, latitude, longitude, water_level: waterLevel,
        description, photo_url: photoUrl, voice_url: voiceUrl, created_at: new Date().toISOString(),
      }).select().single();
      if (error) throw error;
      return data;
    }
    const result = await query(
      `INSERT INTO flood_reports 
       (user_id, latitude, longitude, water_level, description, photo_url, voice_url, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       RETURNING *`,
      [userId, latitude, longitude, waterLevel, description, photoUrl, voiceUrl]
    );
    return result.rows[0];
  },

  async findAll(limit = 100) {
    if (useRest) {
      const sb = getSupabase();
      const { data, error } = await sb.from('flood_reports')
        .select('*, users(name)')
        .order('created_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data.map(r => ({ ...r, reporter_name: r.users?.name }));
    }
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

  async findNearby(latitude, longitude, radiusKm = 5) {
    if (useRest) {
      // Bounding box filter + JS distance calc (PostGIS not available via REST)
      const sb = getSupabase();
      const degPerKm = 1 / 111.32;
      const latRange = radiusKm * degPerKm;
      const lngRange = radiusKm * degPerKm / Math.cos(latitude * Math.PI / 180);
      const { data, error } = await sb.from('flood_reports')
        .select('*')
        .gte('latitude', latitude - latRange)
        .lte('latitude', latitude + latRange)
        .gte('longitude', longitude - lngRange)
        .lte('longitude', longitude + lngRange)
        .order('created_at', { ascending: false });
      if (error) throw error;
      // Calculate actual distance using haversine
      return data.map(r => ({
        ...r,
        distance_km: haversine(latitude, longitude, r.latitude, r.longitude),
      })).filter(r => r.distance_km <= radiusKm);
    }
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

  async findById(reportId) {
    if (useRest) {
      const sb = getSupabase();
      const { data, error } = await sb.from('flood_reports')
        .select('*').eq('report_id', reportId).single();
      if (error) throw error;
      return data;
    }
    const result = await query(
      'SELECT * FROM flood_reports WHERE report_id = $1',
      [reportId]
    );
    return result.rows[0];
  }
};

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

module.exports = Report;