const nodemailer = require('nodemailer');

function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });
}

const LOGO_URL = 'https://staff-personnel-management-system.vercel.app/uploads/Navy-logo.jpeg';

function emailHeader() {
  return `
    <div style="background:#0f172a;border-radius:12px 12px 0 0;padding:24px 32px;text-align:center;">
      <img src="${LOGO_URL}" alt="Naval Outpost Idah" style="width:72px;height:72px;object-fit:contain;border-radius:50%;border:3px solid rgba(255,255,255,0.2);margin-bottom:12px;" />
      <div style="font-size:18px;font-weight:700;color:#ffffff;letter-spacing:0.3px;">Naval Outpost Idah</div>
      <div style="font-size:11px;color:#94a3b8;letter-spacing:1px;text-transform:uppercase;margin-top:3px;">Personnel Management System</div>
    </div>
  `;
}

function emailFooter() {
  return `
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0 16px;">
    <div style="font-size:11px;color:#94a3b8;text-align:center;">This is an automated notification from NOP-IDAH PMS &mdash; do not reply to this email.</div>
  `;
}

async function sendDutyAssignedEmail(to, { name, rank, dutyType, dutyDate, shift, location, notes }) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !to) return;
  const shiftText = shift ? ` (${shift} shift)` : '';
  try {
    await createTransporter().sendMail({
      from: `"NOP-IDAH PMS" <${process.env.GMAIL_USER}>`,
      to,
      subject: `Duty Assignment – ${dutyType} on ${dutyDate}`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;background:#f0f4f8;padding:28px 16px;">
          ${emailHeader()}
          <div style="background:white;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;border-top:none;">
            <div style="font-size:15px;color:#374151;margin-bottom:16px;">Dear <strong>${rank} ${name}</strong>,</div>
            <div style="font-size:14px;color:#374151;line-height:1.7;margin-bottom:24px;">You have been assigned to the following duty. Please acknowledge receipt and report accordingly.</div>
            <div style="background:#f1f5ff;border-left:4px solid #1e3a8a;border-radius:6px;padding:18px 20px;margin-bottom:24px;">
              <div style="font-size:11px;color:#1e3a8a;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px;">Duty Details</div>
              <table style="width:100%;border-collapse:collapse;font-size:14px;color:#0f172a;">
                <tr><td style="padding:4px 0;color:#64748b;width:90px;">Type</td><td style="padding:4px 0;font-weight:600;">${dutyType}</td></tr>
                <tr><td style="padding:4px 0;color:#64748b;">Date</td><td style="padding:4px 0;font-weight:600;">${dutyDate}${shiftText}</td></tr>
                ${location ? `<tr><td style="padding:4px 0;color:#64748b;">Location</td><td style="padding:4px 0;font-weight:600;">${location}</td></tr>` : ''}
                ${notes ? `<tr><td style="padding:4px 0;color:#64748b;vertical-align:top;">Notes</td><td style="padding:4px 0;">${notes}</td></tr>` : ''}
              </table>
            </div>
            <div style="font-size:13px;color:#64748b;line-height:1.6;">If you have any questions regarding this assignment, contact your commanding officer.</div>
            ${emailFooter()}
          </div>
        </div>
      `,
    });
    console.log('Assignment email sent to', to);
  } catch (err) {
    console.error('Failed to send assignment email:', err.message);
  }
}

async function sendDutyReminderEmail(to, { name, rank, dutyType, dutyDate, shift, location, notes }) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !to) return;
  const shiftText = shift ? ` (${shift} shift)` : '';
  try {
    await createTransporter().sendMail({
      from: `"NOP-IDAH PMS" <${process.env.GMAIL_USER}>`,
      to,
      subject: `Reminder: You are on duty today – ${dutyType}`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;background:#f0f4f8;padding:28px 16px;">
          ${emailHeader()}
          <div style="background:white;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;border-top:none;">
            <div style="background:#fef9c3;border:1px solid #fde047;border-radius:8px;padding:12px 16px;margin-bottom:20px;font-size:13px;font-weight:600;color:#854d0e;display:flex;gap:8px;align-items:center;">
              ⏰ &nbsp;This is a duty reminder for today.
            </div>
            <div style="font-size:15px;color:#374151;margin-bottom:16px;">Dear <strong>${rank} ${name}</strong>,</div>
            <div style="font-size:14px;color:#374151;line-height:1.7;margin-bottom:24px;">This is a reminder that you are scheduled for duty <strong>today</strong>. Please ensure you are at your post at the required time.</div>
            <div style="background:#f1f5ff;border-left:4px solid #1e3a8a;border-radius:6px;padding:18px 20px;margin-bottom:24px;">
              <div style="font-size:11px;color:#1e3a8a;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px;">Today's Duty</div>
              <table style="width:100%;border-collapse:collapse;font-size:14px;color:#0f172a;">
                <tr><td style="padding:4px 0;color:#64748b;width:90px;">Type</td><td style="padding:4px 0;font-weight:600;">${dutyType}</td></tr>
                <tr><td style="padding:4px 0;color:#64748b;">Date</td><td style="padding:4px 0;font-weight:600;">${dutyDate}${shiftText}</td></tr>
                ${location ? `<tr><td style="padding:4px 0;color:#64748b;">Location</td><td style="padding:4px 0;font-weight:600;">${location}</td></tr>` : ''}
                ${notes ? `<tr><td style="padding:4px 0;color:#64748b;vertical-align:top;">Notes</td><td style="padding:4px 0;">${notes}</td></tr>` : ''}
              </table>
            </div>
            <div style="font-size:13px;color:#64748b;line-height:1.6;">Report any issues to your commanding officer immediately.</div>
            ${emailFooter()}
          </div>
        </div>
      `,
    });
    console.log('Reminder email sent to', to);
  } catch (err) {
    console.error('Failed to send reminder email:', err.message);
  }
}

async function sendDutyRemovedEmail(to, { name, rank, dutyType, dutyDate, shift, location }) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !to) return;
  const shiftText = shift ? ` (${shift} shift)` : '';
  try {
    await createTransporter().sendMail({
      from: `"NOP-IDAH PMS" <${process.env.GMAIL_USER}>`,
      to,
      subject: `Duty Cancelled – ${dutyType} on ${dutyDate}`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;background:#f0f4f8;padding:28px 16px;">
          ${emailHeader()}
          <div style="background:white;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;border-top:none;">
            <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px 16px;margin-bottom:20px;font-size:13px;font-weight:600;color:#b91c1c;">
              ❌ &nbsp;Your duty assignment has been cancelled.
            </div>
            <div style="font-size:15px;color:#374151;margin-bottom:16px;">Dear <strong>${rank} ${name}</strong>,</div>
            <div style="font-size:14px;color:#374151;line-height:1.7;margin-bottom:24px;">Your duty assignment listed below has been <strong>removed</strong> from the roster. No further action is required on your part unless instructed otherwise.</div>
            <div style="background:#fef2f2;border-left:4px solid #ef4444;border-radius:6px;padding:18px 20px;margin-bottom:24px;">
              <div style="font-size:11px;color:#b91c1c;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px;">Cancelled Duty</div>
              <table style="width:100%;border-collapse:collapse;font-size:14px;color:#0f172a;">
                <tr><td style="padding:4px 0;color:#64748b;width:90px;">Type</td><td style="padding:4px 0;font-weight:600;">${dutyType}</td></tr>
                <tr><td style="padding:4px 0;color:#64748b;">Date</td><td style="padding:4px 0;font-weight:600;">${dutyDate}${shiftText}</td></tr>
                ${location ? `<tr><td style="padding:4px 0;color:#64748b;">Location</td><td style="padding:4px 0;font-weight:600;">${location}</td></tr>` : ''}
              </table>
            </div>
            <div style="font-size:13px;color:#64748b;line-height:1.6;">If you believe this is an error, contact your commanding officer immediately.</div>
            ${emailFooter()}
          </div>
        </div>
      `,
    });
    console.log('Removal email sent to', to);
  } catch (err) {
    console.error('Failed to send removal email:', err.message);
  }
}

module.exports = { sendDutyAssignedEmail, sendDutyReminderEmail, sendDutyRemovedEmail };
