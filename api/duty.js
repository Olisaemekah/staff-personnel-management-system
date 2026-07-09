const { supabase } = require('../lib/supabaseServer');

async function sendDutyEmail(to, name, rank, dutyType, dutyDate, shift, location, notes) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !to) return;

  const shiftText = shift ? ` (${shift} shift)` : '';
  const locationText = location ? `\nLocation: ${location}` : '';
  const notesText = notes ? `\nNotes: ${notes}` : '';

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'NOI PMS <noreply@noipm.ng>',
      to: [to],
      subject: `Duty Assignment – ${dutyType} on ${dutyDate}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:540px;margin:0 auto;background:#f8fafc;padding:32px 20px;">
          <div style="background:white;border-radius:12px;padding:32px;border:1px solid #e2e8f0;">
            <div style="font-size:20px;font-weight:700;color:#0f172a;margin-bottom:4px;">Naval Outpost Idah</div>
            <div style="font-size:12px;color:#94a3b8;margin-bottom:24px;">Personnel Management System</div>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin-bottom:24px;">
            <div style="font-size:15px;color:#374151;margin-bottom:16px;">Dear <strong>${rank} ${name}</strong>,</div>
            <div style="font-size:14px;color:#374151;line-height:1.6;margin-bottom:20px;">
              You have been assigned to the following duty. Please acknowledge receipt and report accordingly.
            </div>
            <div style="background:#f1f5ff;border-left:4px solid #1e3a8a;border-radius:6px;padding:16px 20px;margin-bottom:20px;">
              <div style="font-size:13px;color:#1e3a8a;font-weight:700;margin-bottom:8px;">DUTY DETAILS</div>
              <div style="font-size:14px;color:#0f172a;"><strong>Type:</strong> ${dutyType}</div>
              <div style="font-size:14px;color:#0f172a;margin-top:4px;"><strong>Date:</strong> ${dutyDate}${shiftText}</div>
              ${location ? `<div style="font-size:14px;color:#0f172a;margin-top:4px;"><strong>Location:</strong> ${location}</div>` : ''}
              ${notes ? `<div style="font-size:14px;color:#0f172a;margin-top:4px;"><strong>Notes:</strong> ${notes}</div>` : ''}
            </div>
            <div style="font-size:13px;color:#64748b;">If you have any questions, contact your commanding officer.</div>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0 16px;">
            <div style="font-size:12px;color:#94a3b8;">This is an automated message from NOI PMS. Do not reply to this email.</div>
          </div>
        </div>
      `
    })
  }).catch(() => {});
}

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

    if (data.staff && data.staff.email) {
      await sendDutyEmail(data.staff.email, data.staff.name, data.staff.rank || '', dutyType, dutyDate, shift, location, notes);
      await supabase.from('duty_assignments').update({ notified: true }).eq('id', data.id);
    }

    return res.status(201).json({ assignment: data });
  }

  if (method === 'DELETE') {
    if (!id) return res.status(400).json({ error: 'Missing id parameter' });
    const { error } = await supabase.from('duty_assignments').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
