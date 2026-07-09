const { supabase } = require('../lib/supabaseServer');
const { sendDutyReminderEmail } = require('../lib/sendEmail');

module.exports = async (req, res) => {
  // Only allow Vercel cron or internal calls
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('duty_assignments')
    .select('*, staff(id, name, rank, email)')
    .eq('duty_date', today)
    .eq('reminder_sent', false);

  if (error) return res.status(500).json({ error: error.message });

  const assignments = data || [];
  let sent = 0;

  for (const a of assignments) {
    if (a.staff && a.staff.email) {
      await sendDutyReminderEmail(a.staff.email, {
        name: a.staff.name,
        rank: a.staff.rank || '',
        dutyType: a.duty_type,
        dutyDate: a.duty_date,
        shift: a.shift,
        location: a.location,
        notes: a.notes,
      });
      await supabase.from('duty_assignments').update({ reminder_sent: true }).eq('id', a.id);
      sent++;
    }
  }

  console.log(`Duty reminder cron: ${sent} reminder(s) sent for ${today}`);
  return res.status(200).json({ date: today, sent });
};
