const { query } = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  // Create new user
  async create({ name, email, password, role = 'citizen', phone = null }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(
      `INSERT INTO users (name, email, password, role, phone, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING user_id, name, email, role, phone, created_at`,
      [name, email, hashedPassword, role, phone]
    );
    return result.rows[0];
  },

  // Find by email
  async findByEmail(email) {
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  },

  // Find by ID
  async findById(userId) {
    const result = await query(
      'SELECT user_id, name, email, role, phone, created_at FROM users WHERE user_id = $1',
      [userId]
    );
    return result.rows[0];
  },

  // Verify password
  async verifyPassword(inputPassword, hashedPassword) {
    return bcrypt.compare(inputPassword, hashedPassword);
  }
};

module.exports = User;