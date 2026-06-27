const { supabase } = require('../lib/supabaseServer');

module.exports = async (req, res) => {
  const { method } = req;
  const q = (req.query && req.query.q) || (req.body && req.body.q) || '';

  if (method === 'GET') {
    let query = supabase.from('staff').select('*').order('created_at', { ascending: false });

    if (q) {
      const filter = q.trim();
      query = query.or(
        `name.ilike.%${filter}%,service_number.ilike.%${filter}%,rank.ilike.%${filter}%,batch.ilike.%${filter}%`
      );
    }

    const { data, error } = await query;
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ staff: data || [] });
  }

  if (method === 'POST') {
    const staff = req.body;
    if (!staff || !staff.name || !staff.service_number) {
      return res.status(400).json({ error: 'Missing required staff fields: name and service_number' });
    }

    const payload = {
      name: staff.name,
      rank: staff.rank || 'Unknown',
      service_number: staff.service_number,
      batch: staff.batch || null,
      course: staff.course || null,
      current_deployment: staff.current_deployment || null,
      photo_url: staff.photo_url || null,
      status: staff.status || 'active',
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase.from('staff').insert([payload]).select().single();
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ staff: data });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
