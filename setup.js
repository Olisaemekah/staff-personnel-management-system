// Full SPMS database setup: creates tables and seeds users
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const envLines = fs.readFileSync('.env', 'utf8').split(/\r?\n/).filter(Boolean);
const env = Object.fromEntries(envLines.map(line => line.split('=', 2).map(s => s.trim())));
const url = env.SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY;
if (!url || !serviceKey) { console.error('Missing SUPABASE_URL or key in .env'); process.exit(1); }

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });
const projectRef = url.replace('https://', '').split('.')[0];

const SETUP_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  username text NOT NULL UNIQUE,
  password text NOT NULL,
  role text NOT NULL DEFAULT 'viewer',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rank text,
  service_number text,
  course text,
  batch text,
  year_joined integer,
  status text DEFAULT 'active',
  photo_url text,
  current_deployment jsonb,
  courses_attended jsonb DEFAULT '[]'::jsonb,
  deployments jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);
`.trim();

const USERS = [
  { name: 'System Administrator', username: 'admin', password: 'admin123', role: 'admin' },
  { name: 'Capt. A. Bello', username: 'viewer', password: 'viewer123', role: 'viewer' },
  { name: 'Lt. Col. C. Eze', username: 'viewer2', password: 'view456', role: 'viewer' },
  { name: 'Ozouwa Olisaemeka', username: 'olisaemekaozouwa', password: 'Olisaemeka4518', role: 'admin' },
];

async function tryManagementAPI() {
  const res = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${serviceKey}` },
    body: JSON.stringify({ query: SETUP_SQL })
  });
  return res.ok;
}

(async () => {
  console.log('\n=== SPMS Database Setup ===\n');

  // Try creating tables via Supabase Management API
  console.log('Creating database tables via Management API...');
  const mgmtOk = await tryManagementAPI();

  if (!mgmtOk) {
    console.log('\n⚠️  Automatic table creation failed (requires a personal Supabase access token).');
    console.log('\nPlease do this ONE TIME in your Supabase Dashboard:');
    console.log('  1. Go to https://supabase.com/dashboard/project/' + projectRef + '/sql/new');
    console.log('  2. Paste and run this SQL:\n');
    console.log('─'.repeat(60));
    console.log(SETUP_SQL);
    console.log('─'.repeat(60));
    console.log('\nAfter running the SQL, run: node setup.js --seed-only\n');
    process.exit(1);
  }

  console.log('  ✓ Tables created (or already existed)');

  // Seed users
  console.log('\nSeeding system users...');
  for (const user of USERS) {
    const { data, error } = await supabase.from('users').upsert([user], { onConflict: 'username' }).select('username, role').single();
    if (error) {
      console.error(`  ✗ ${user.username}: ${error.message}`);
    } else {
      console.log(`  ✓ ${data.username} (${data.role})`);
    }
  }

  console.log('\n✅ Database setup complete!\n');
})();
