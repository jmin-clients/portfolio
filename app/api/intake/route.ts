import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

type IntakePayload = {
  businessName: string;
  projectType: string;
  situation: string;
  timeline: string;
  budget: string;
  goals: string;
};

// Load Google service account credentials.
// On Vercel the env var is a valid JSON string.
// Locally, .env.local stores it as multi-line (dotenv limitation), so we fall
// back to reading the JSON file directly from the project root.
function getCredentials() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    try {
      return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
    } catch {
      // Multi-line .env.local — fall through to file fallback
    }
  }
  const files = readdirSync(process.cwd()).filter((f) =>
    /jmin-work-portfolio.*\.json$/.test(f)
  );
  if (files.length > 0) {
    return JSON.parse(readFileSync(join(process.cwd(), files[0]), 'utf-8'));
  }
  throw new Error('Google service account credentials not found');
}

async function appendToSheet(data: IntakePayload) {
  const credentials = getCredentials();
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Sheet1!A:G',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [
        [
          data.businessName,
          data.projectType,
          data.situation,
          data.timeline,
          data.budget,
          data.goals || '',
          new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
        ],
      ],
    },
  });
}

async function sendNotificationEmail(data: IntakePayload) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const subject = `New inquiry: ${data.businessName || 'Unknown'} — ${data.projectType}`;

  const html = `
    <div style="font-family:monospace;max-width:600px;margin:0 auto;color:#1a1a1a">
      <h2 style="font-size:18px;font-weight:700;margin-bottom:24px;border-bottom:1px solid #e5e5e5;padding-bottom:12px">
        New project inquiry — jmin.work
      </h2>
      <table style="width:100%;border-collapse:collapse">
        ${[
          ['Business', data.businessName],
          ['Project type', data.projectType],
          ['Situation', data.situation],
          ['Timeline', data.timeline],
          ['Budget', data.budget],
          ['Goals', data.goals || 'Not specified'],
        ]
          .map(
            ([label, value]) => `
          <tr style="border-bottom:1px solid #f0f0f0">
            <td style="padding:10px 12px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#888;width:120px;vertical-align:top">${label}</td>
            <td style="padding:10px 12px;font-size:14px;color:#1a1a1a">${value}</td>
          </tr>`
          )
          .join('')}
      </table>
      <p style="margin-top:24px;font-size:11px;color:#aaa">
        Submitted ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"jmin.work" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject,
    html,
  });
}

export async function POST(request: Request) {
  try {
    const data: IntakePayload = await request.json();

    if (!data.businessName?.trim() || !data.projectType?.trim()) {
      return Response.json(
        { ok: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Run Sheets write and email in parallel — if one fails, still attempt the other
    const [sheetsResult, emailResult] = await Promise.allSettled([
      appendToSheet(data),
      sendNotificationEmail(data),
    ]);

    if (sheetsResult.status === 'rejected') {
      console.error('[intake] Sheets error:', sheetsResult.reason);
    }
    if (emailResult.status === 'rejected') {
      console.error('[intake] Email error:', emailResult.reason);
    }

    // Return success as long as at least one channel worked
    const bothFailed =
      sheetsResult.status === 'rejected' && emailResult.status === 'rejected';
    if (bothFailed) {
      return Response.json(
        { ok: false, error: 'Submission failed' },
        { status: 500 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[intake] Unexpected error:', err);
    return Response.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
