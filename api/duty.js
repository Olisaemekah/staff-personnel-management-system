const { supabase } = require('../lib/supabaseServer');
const { sendDutyAssignedEmail, sendDutyRemovedEmail } = require('../lib/sendEmail');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { method } = req;
  const id = (req.query && req.query.id) || null;

  if (method === 'GET') {
    const { data, error } = await supabase
      .from('duty_assignments')
      .select('*, staff(id, name, rank, email)')
      .order('duty_date', { ascending: true });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ assignments: data || [] });
  }

  if (method === 'POST') {
    const { staffId, dutyType, dutyDate, shift, location, notes } = req.body || {};
    if (!staffId || !dutyType || !dutyDate) {
      return res.status(400).json({ error: 'Personnel, duty type and date are required' });
    }

    const { data, error } = await supabase
      .from('duty_assignments')
      .insert([{ staff_id: staffId, duty_type: dutyType, duty_date: dutyDate, shift: shift || null, location: location || null, notes: notes || null }])
      .select('*, staff(id, name, rank, email)')
      .single();

    if (error) return res.status(500).json({ error: error.message });

    let emailStatus = 'no_email';
    if (data.staff && data.staff.email) {
      await sendDutyAssignedEmail(data.staff.email, {
        name: data.staff.name,
        rank: data.staff.rank || '',
        dutyType, dutyDate, shift, location, notes,
      });
      await supabase.from('duty_assignments').update({ notified: true }).eq('id', data.id);
      emailStatus = 'sent';
    }

    console.log('Duty assigned. Staff email:', data.staff?.email || 'none', '| Status:', emailStatus);
    return res.status(201).json({ assignment: data, emailStatus });
  }

  if (method === 'DELETE') {
    if (!id) return res.status(400).json({ error: 'Missing id parameter' });

    // Fetch assignment details before deleting so we can notify
    const { data: existing } = await supabase
      .from('duty_assignments')
      .select('*, staff(id, name, rank, email)')
      .eq('id', id)
      .single();

    const { error } = await supabase.from('duty_assignments').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });

    if (existing && existing.staff && existing.staff.email) {
      await sendDutyRemovedEmail(existing.staff.email, {
        name: existing.staff.name,
        rank: existing.staff.rank || '',
        dutyType: existing.duty_type,
        dutyDate: existing.duty_date,
        shift: existing.shift,
        location: existing.location,
      });
    }

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
