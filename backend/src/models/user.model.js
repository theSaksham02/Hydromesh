const { query, useRest } = require('../config/database');
const { getSupabase } = require('../config/supabase');
const bcrypt = require('bcryptjs');

const User = {
  async create({ name, email, password, role = 'citizen', phone = null }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (useRest) {
      const sb = getSupabase();
      const { data, error } = await sb.from('users').insert({
        name, email, password: hashedPassword, role, phone, created_at: new Date().toISOString(),
      }).select('user_id, name, email, role, phone, created_at').single();
      if (error) throw error;
      return data;
    }
    const result = await query(
      `INSERT INTO users (name, email, password, role, phone, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING user_id, name, email, role, phone, created_at`,
      [name, email, hashedPassword, role, phone]
    );
    return result.rows[0];
  },

  async findByEmail(email) {
    if (useRest) {
      const sb = getSupabase();
      const { data, error } = await sb.from('users')
        .select('*').eq('email', email).maybeSingle();
      if (error) throw error;
      return data;
    }
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  async findById(userId) {
    if (useRest) {
      const sb = getSupabase();
      const { data, error } = await sb.from('users')
        .select('user_id, name, email, role, phone, created_at')
        .eq('user_id', userId).single();
      if (error) throw error;
      return data;
    }
    const result = await query(
      'SELECT user_id, name, email, role, phone, created_at FROM users WHERE user_id = $1',
      [userId]
    );
    return result.rows[0];
  },

  async verifyPassword(inputPassword, hashedPassword) {
    return bcrypt.compare(inputPassword, hashedPassword);
  }
};

module.exports = User;