const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const envLines = fs.readFileSync('.env', 'utf8').split(/\r?\n/).filter(Boolean);
const env = Object.fromEntries(envLines.map(line => line.split('=', 2).map(s => s.trim())));
const url = env.SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/SUPABASE_ANON_KEY in .env');
  process.exit(1);
}
const supabase = createClient(url, key, { auth: { persistSession: false } });

const USERS = [
  { name: 'System Administrator', username: 'admin', password: 'admin123', role: 'admin' },
  { name: 'Capt. A. Bello', username: 'viewer', password: 'viewer123', role: 'viewer' },
  { name: 'Lt. Col. C. Eze', username: 'viewer2', password: 'view456', role: 'viewer' },
  { name: 'Ozouwa Olisaemeka', username: 'olisaemekaozouwa', password: 'Olisaemeka4518', role: 'admin' },
];

(async () => {
  console.log('--- Seeding users ---');
  for (const user of USERS) {
    const { data, error } = await supabase.from('users').upsert([user], { onConflict: 'username' }).select().single();
    if (error) {
      console.error('ERROR seeding user', user.username, ':', error.message);
    } else {
      console.log('OK:', data.username, '(' + data.role + ')');
    }
  }
  console.log('\nDone. All users seeded.');
  console.log('\nNOTE: Make sure your Supabase "staff" table has these columns:');
  console.log('  year_joined    integer');
  console.log('  courses_attended  jsonb  (default: []::jsonb)');
  console.log('  deployments    jsonb  (default: []::jsonb)');
  console.log('\nRun this SQL in the Supabase SQL Editor if needed:');
  console.log('  ALTER TABLE staff ADD COLUMN IF NOT EXISTS year_joined integer;');
  console.log('  ALTER TABLE staff ADD COLUMN IF NOT EXISTS courses_attended jsonb DEFAULT \'[]\'::jsonb;');
  console.log('  ALTER TABLE staff ADD COLUMN IF NOT EXISTS deployments jsonb DEFAULT \'[]\'::jsonb;');
})();
