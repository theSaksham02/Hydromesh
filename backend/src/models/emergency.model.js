const { query, useRest } = require('../config/database');
const { getSupabase } = require('../config/supabase');

const Emergency = {
  async create({ citizenId, latitude, longitude, description, priority = 'medium' }) {
    if (useRest) {
      const sb = getSupabase();
      const { data, error } = await sb.from('emergency_requests').insert({
        citizen_id: citizenId, latitude, longitude, description,
        priority, status: 'pending', created_at: new Date().toISOString(),
      }).select().single();
      if (error) throw error;
      return data;
    }
    const result = await query(
      `INSERT INTO emergency_requests 
       (citizen_id, latitude, longitude, description, priority, status, created_at)
       VALUES ($1, $2, $3, $4, $5, 'pending', NOW())
       RETURNING *`,
      [citizenId, latitude, longitude, description, priority]
    );
    return result.rows[0];
  },

  async findNearbyResponders(latitude, longitude, radiusKm = 10) {
    if (useRest) {
      const sb = getSupabase();
      const { data, error } = await sb.from('users')
        .select('user_id, name, phone')
        .eq('role', 'responder');
      if (error) throw error;
      return data;
    }
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

  async assignResponder(requestId, responderId) {
    if (useRest) {
      const sb = getSupabase();
      const { data, error } = await sb.from('emergency_requests')
        .update({ responder_id: responderId, status: 'assigned', assigned_at: new Date().toISOString() })
        .eq('request_id', requestId).select().single();
      if (error) throw error;
      return data;
    }
    const result = await query(
      `UPDATE emergency_requests 
       SET responder_id = $2, status = 'assigned', assigned_at = NOW()
       WHERE request_id = $1
       RETURNING *`,
      [requestId, responderId]
    );
    return result.rows[0];
  },

  async updateStatus(requestId, status) {
    if (useRest) {
      const sb = getSupabase();
      const update = { status };
      if (status === 'resolved') update.resolved_at = new Date().toISOString();
      const { data, error } = await sb.from('emergency_requests')
        .update(update).eq('request_id', requestId).select().single();
      if (error) throw error;
      return data;
    }
    const result = await query(
      `UPDATE emergency_requests 
       SET status = $2, resolved_at = CASE WHEN $2 = 'resolved' THEN NOW() ELSE NULL END
       WHERE request_id = $1
       RETURNING *`,
      [requestId, status]
    );
    return result.rows[0];
  },

  async getPendingRequests() {
    if (useRest) {
      const sb = getSupabase();
      const { data, error } = await sb.from('emergency_requests')
        .select('*, users!emergency_requests_citizen_id_fkey(name, phone)')
        .eq('status', 'pending')
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data.map(r => ({
        ...r,
        citizen_name: r.users?.name,
        citizen_phone: r.users?.phone,
      }));
    }
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