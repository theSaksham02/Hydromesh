const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('✅ Connected to Supabase PostgreSQL');
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
};

const query = (text, params) => pool.query(text, params);
module.exports = { connectDB, query, pool };