const { supabase } = require('../lib/supabaseServer');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { method } = req;
  const id = (req.query && req.query.id) || null;

  if (method === 'GET') {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, username, role')
      .order('id');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ users: data || [] });
  }

  if (method === 'PUT') {
    if (!id) return res.status(400).json({ error: 'Missing id parameter' });
    const { name, username, role, password } = req.body || {};
    if (!name || !username) return res.status(400).json({ error: 'Name and username are required' });
    const update = { name: name.trim(), username: username.trim(), role: role || 'viewer' };
    if (password && password.trim()) update.password = password.trim();
    const { data, error } = await supabase
      .from('users')
      .update(update)
      .eq('id', id)
      .select('id, name, username, role')
      .single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ user: data });
  }

  if (method === 'DELETE') {
    if (!id) return res.status(400).json({ error: 'Missing id parameter' });
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
