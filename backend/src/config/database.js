const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL is not set. Exiting.');
  process.exit(1);
}

// Log masked URL so Render logs show exactly what's being used
const maskedUrl = connectionString.replace(/:([^@:]{1,80})@/, ':***@');
console.log(`🔗 DATABASE_URL resolved to: ${maskedUrl}`);

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to Supabase PostgreSQL');
    client.release();
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.error('   Hostname attempted:', error.hostname ?? '(unknown)');
    process.exit(1);
  }
};

const query = (text, params) => pool.query(text, params);
module.exports = { connectDB, query, pool };
