const { supabase } = require('../lib/supabaseServer');
const nodemailer = require('nodemailer');

async function sendDutyEmail(to, name, rank, dutyType, dutyDate, shift, location, notes) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailPass || !to) return;

  const shiftText = shift ? ` (${shift} shift)` : '';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: gmailUser, pass: gmailPass },
  });

  try {
    await transporter.sendMail({
      from: `"NOP-IDAH PMS" <${gmailUser}>`,
      to,
      subject: `Duty Assignment – ${dutyType} on ${dutyDate}`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;background:#f0f4f8;padding:28px 16px;">
          <!-- Header with logo -->
          <div style="background:#0f172a;border-radius:12px 12px 0 0;padding:24px 32px;text-align:center;">
            <img src="https://staff-personnel-management-system.vercel.app/uploads/Navy-logo.jpeg" alt="Naval Outpost Idah" style="width:72px;height:72px;object-fit:contain;border-radius:50%;border:3px solid rgba(255,255,255,0.2);margin-bottom:12px;" />
            <div style="font-size:18px;font-weight:700;color:#ffffff;letter-spacing:0.3px;">Naval Outpost Idah</div>
            <div style="font-size:11px;color:#94a3b8;letter-spacing:1px;text-transform:uppercase;margin-top:3px;">Personnel Management System</div>
          </div>
          <!-- Body -->
          <div style="background:white;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;border-top:none;">
            <div style="font-size:15px;color:#374151;margin-bottom:16px;">Dear <strong>${rank} ${name}</strong>,</div>
            <div style="font-size:14px;color:#374151;line-height:1.7;margin-bottom:24px;">
              You have been assigned to the following duty. Please acknowledge receipt and report accordingly.
            </div>
            <div style="background:#f1f5ff;border-left:4px solid #1e3a8a;border-radius:6px;padding:18px 20px;margin-bottom:24px;">
              <div style="font-size:11px;color:#1e3a8a;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px;">Duty Details</div>
              <table style="width:100%;border-collapse:collapse;font-size:14px;color:#0f172a;">
                <tr><td style="padding:4px 0;color:#64748b;width:90px;">Type</td><td style="padding:4px 0;font-weight:600;">${dutyType}</td></tr>
                <tr><td style="padding:4px 0;color:#64748b;">Date</td><td style="padding:4px 0;font-weight:600;">${dutyDate}${shiftText}</td></tr>
                ${location ? `<tr><td style="padding:4px 0;color:#64748b;">Location</td><td style="padding:4px 0;font-weight:600;">${location}</td></tr>` : ''}
                ${notes ? `<tr><td style="padding:4px 0;color:#64748b;vertical-align:top;">Notes</td><td style="padding:4px 0;">${notes}</td></tr>` : ''}
              </table>
            </div>
            <div style="font-size:13px;color:#64748b;line-height:1.6;">If you have any questions regarding this assignment, please contact your commanding officer.</div>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0 16px;">
            <div style="font-size:11px;color:#94a3b8;text-align:center;">This is an automated notification from NOP-IDAH PMS &mdash; do not reply to this email.</div>
          </div>
        </div>
      `,
    });
    console.log('Duty email sent to', to);
  } catch (err) {
    console.error('Failed to send duty email:', err.message);
  }
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

    let emailStatus = 'no_email';
    if (data.staff && data.staff.email) {
      await sendDutyEmail(data.staff.email, data.staff.name, data.staff.rank || '', dutyType, dutyDate, shift, location, notes);
      await supabase.from('duty_assignments').update({ notified: true }).eq('id', data.id);
      emailStatus = 'sent';
    }

    console.log('Duty assigned. Staff email:', data.staff?.email || 'none', '| Status:', emailStatus);
    return res.status(201).json({ assignment: data, emailStatus });
  }

  if (method === 'DELETE') {
    if (!id) return res.status(400).json({ error: 'Missing id parameter' });
    const { error } = await supabase.from('duty_assignments').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
