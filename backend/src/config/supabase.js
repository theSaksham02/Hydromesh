const { createClient } = require('@supabase/supabase-js');

let supabase = null;

function getSupabase() {
  if (supabase) return supabase;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !key) return null;

  supabase = createClient(url, key, {
    auth: { persistSession: false },
  });
  console.log('🔗 Using Supabase REST API (HTTPS/IPv4)');
  return supabase;
}

module.exports = { getSupabase };
