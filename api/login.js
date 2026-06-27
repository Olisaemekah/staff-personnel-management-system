const { supabase } = require('../lib/supabaseServer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const { data, error } = await supabase
    .from('users')
    .select('id, name, username, role')
    .eq('username', username)
    .eq('password', password)
    .single();

  if (error || !data) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  return res.status(200).json({ user: data });
};
