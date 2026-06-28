const { supabase } = require('../lib/supabaseServer');

function fromDb(row) {
  return {
    id: row.id,
    name: row.name,
    rank: row.rank,
    serviceNumber: row.service_number,
    course: row.course || '',
    batch: row.batch || '',
    yearJoined: row.year_joined || new Date().getFullYear(),
    status: row.status || 'active',
    photo: row.photo_url || '',
    currentDeployment: row.current_deployment || null,
    coursesAttended: (row.courses_attended || []).map((c, i) => ({ id: c.id || (i + 1), ...c })),
    deployments: (row.deployments || []).map((d, i) => ({ id: d.id || (i + 1), ...d })),
    createdAt: row.created_at ? row.created_at.split('T')[0] : new Date().toISOString().split('T')[0]
  };
}

function toDb(staff) {
  return {
    name: staff.name,
    rank: staff.rank || 'Unknown',
    service_number: staff.serviceNumber || staff.service_number || '',
    course: staff.course || null,
    batch: staff.batch || null,
    year_joined: staff.yearJoined || new Date().getFullYear(),
    status: staff.status || 'active',
    photo_url: staff.photo || staff.photo_url || null,
    current_deployment: staff.currentDeployment || staff.current_deployment || null,
    courses_attended: staff.coursesAttended || staff.courses_attended || [],
    deployments: staff.deployments || []
  };
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { method } = req;
  const id = (req.query && req.query.id) || null;
  const q = (req.query && req.query.q) || '';

  if (method === 'GET') {
    let query = supabase.from('staff').select('*').order('created_at', { ascending: false });
    if (q) {
      const filter = q.trim();
      query = query.or(
        `name.ilike.%${filter}%,service_number.ilike.%${filter}%,rank.ilike.%${filter}%,batch.ilike.%${filter}%`
      );
    }
    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ staff: (data || []).map(fromDb) });
  }

  if (method === 'POST') {
    const staff = req.body;
    if (!staff || !staff.name || (!staff.serviceNumber && !staff.service_number)) {
      return res.status(400).json({ error: 'Missing required fields: name and service number' });
    }
    const payload = { ...toDb(staff), created_at: new Date().toISOString() };
    const { data, error } = await supabase.from('staff').insert([payload]).select().single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json({ staff: fromDb(data) });
  }

  if (method === 'PUT') {
    if (!id) return res.status(400).json({ error: 'Missing id parameter' });
    const staff = req.body;
    const payload = toDb(staff);
    const { data, error } = await supabase.from('staff').update(payload).eq('id', id).select().single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ staff: fromDb(data) });
  }

  if (method === 'DELETE') {
    if (!id) return res.status(400).json({ error: 'Missing id parameter' });
    const { error } = await supabase.from('staff').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
