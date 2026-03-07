const { Pool } = require('pg');
const dns = require('dns');
require('dotenv').config();

// Force IPv4 DNS resolution — Render cannot reach Supabase over IPv6
dns.setDefaultResultOrder('ipv4first');

// Determine connection mode: Supabase REST (HTTPS/IPv4) or direct pg
const useRest = !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY);

let pool = null;

if (!useRest) {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('❌ Neither SUPABASE_URL+SUPABASE_SERVICE_KEY nor DATABASE_URL is set.');
    process.exit(1);
  }

  // Robust parser: splits on the LAST @ so passwords containing @ work correctly
  function parsePostgresUrl(raw) {
    const withoutProto = raw.replace(/^[^:]+:\/\//, '');
    const lastAt = withoutProto.lastIndexOf('@');
    const userInfo = withoutProto.slice(0, lastAt);
    const rest = withoutProto.slice(lastAt + 1);

    const colonIdx = userInfo.indexOf(':');
    const user = userInfo.slice(0, colonIdx);
    const password = decodeURIComponent(userInfo.slice(colonIdx + 1));

    const [hostPart, ...pathParts] = rest.split('/');
    const [host, portStr] = hostPart.split(':');
    const database = pathParts.join('/').split('?')[0];

    return { user, password, host, port: portStr ? parseInt(portStr, 10) : 5432, database };
  }

  const { user, password, host, port, database } = parsePostgresUrl(connectionString);
  console.log(`🔗 Connecting via pg to: ${host}:${port}/${database} as ${user}`);

  pool = new Pool({
    user, password, host, port, database,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });
}

// Retry DB connection with exponential backoff
const connectDB = async (attempt = 1) => {
  if (useRest) {
    // REST mode — test the connection via Supabase client
    const { getSupabase } = require('./supabase');
    const sb = getSupabase();
    const { data, error } = await sb.from('users').select('user_id').limit(1);
    if (error) {
      console.error(`❌ Supabase REST connection test failed: ${error.message}`);
      const delay = Math.min(attempt * 5000, 60000);
      console.error(`   Retrying in ${delay / 1000}s…`);
      setTimeout(() => connectDB(attempt + 1), delay);
    } else {
      console.log('✅ Connected to Supabase via REST API (HTTPS/IPv4)');
    }
    return;
  }

  try {
    const client = await pool.connect();
    console.log('✅ Connected to Supabase PostgreSQL');
    client.release();
  } catch (error) {
    const delay = Math.min(attempt * 5000, 60000);
    console.error(`❌ DB connection failed (attempt ${attempt}): ${error.message}`);
    console.error(`   Retrying in ${delay / 1000}s…`);
    setTimeout(() => connectDB(attempt + 1), delay);
  }
};

const query = (text, params) => {
  if (!pool) throw new Error('Direct pg not available — using REST mode');
  return pool.query(text, params);
};

module.exports = { connectDB, query, pool, useRest };
