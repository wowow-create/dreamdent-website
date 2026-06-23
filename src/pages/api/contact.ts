export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request, locals }) => {
  let body: { name?: string; email?: string; phone?: string; message?: string };

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { name, email, phone, message } = body;

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
  }

  // Cloudflare Workers passes env vars via locals.runtime.env
  const cfEnv = (locals as { runtime?: { env?: Record<string, string> } }).runtime?.env ?? {};
  const resendKey = cfEnv.RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY;
  const contactEmail = cfEnv.CONTACT_EMAIL ?? import.meta.env.CONTACT_EMAIL ?? 'info@dreamdent.eu';

  if (!resendKey) {
    console.error('RESEND_API_KEY not set');
    return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500 });
  }

  const resend = new Resend(resendKey);

  try {
    // Notification to clinic
    await resend.emails.send({
      from: 'DreamDent Website <onboarding@resend.dev>',
      to: [contactEmail],
      subject: `Ново запитване от ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1A1208;">
          <div style="background: #1A1208; padding: 24px 32px; text-align: center;">
            <h1 style="color: #C8A96E; font-size: 24px; font-weight: 400; margin: 0;">
              DreamDent — Ново запитване
            </h1>
          </div>
          <div style="padding: 32px; background: #FAF7F2; border: 1px solid #E8DFD0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6B5F50; width: 120px;">Ime</td>
                <td style="padding: 8px 0; font-size: 15px; color: #1A1208;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6B5F50;">Имейл</td>
                <td style="padding: 8px 0; font-size: 15px;"><a href="mailto:${email}" style="color: #C8A96E;">${email}</a></td>
              </tr>
              ${phone ? `<tr>
                <td style="padding: 8px 0; font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6B5F50;">Телефон</td>
                <td style="padding: 8px 0; font-size: 15px;"><a href="tel:${phone}" style="color: #C8A96E;">${phone}</a></td>
              </tr>` : ''}
              <tr>
                <td colspan="2" style="padding: 16px 0 8px; font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6B5F50;">Съобщение</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 8px 16px; background: white; border: 1px solid #E8DFD0; border-radius: 4px;">
                  <p style="font-size: 15px; line-height: 1.7; color: #1A1208; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
                </td>
              </tr>
            </table>
          </div>
          <div style="padding: 16px 32px; background: #E8DFD0; text-align: center;">
            <p style="font-size: 12px; color: #6B5F50; margin: 0;">DreamDent — dreamdent.eu</p>
          </div>
        </div>
      `,
    });

    // Auto-reply to patient
    await resend.emails.send({
      from: 'DreamDent <onboarding@resend.dev>',
      to: [email],
      subject: 'Потвърждение — DreamDent получи Вашето запитване',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1A1208;">
          <div style="background: #1A1208; padding: 24px 32px; text-align: center;">
            <h1 style="color: #C8A96E; font-size: 24px; font-weight: 400; margin: 0; letter-spacing: 0.02em;">
              DreamDent
            </h1>
            <p style="color: rgba(250,247,242,0.6); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; margin: 6px 0 0;">Дентален Център — Плевен</p>
          </div>
          <div style="padding: 40px 32px; background: #FAF7F2;">
            <p style="font-size: 17px; font-family: Georgia, serif; color: #1A1208;">Уважаеми/а ${name},</p>
            <p style="font-size: 15px; line-height: 1.8; color: #2C2015;">
              Благодарим Ви за запитването! Потвърждаваме, че сме го получили и ще се свържем с Вас в рамките на работния ден.
            </p>
            <p style="font-size: 15px; line-height: 1.8; color: #2C2015;">
              При спешност можете да се свържете с нас директно:
            </p>
            <div style="margin: 24px 0; padding: 20px; background: white; border-left: 3px solid #C8A96E; border-radius: 4px;">
              <p style="margin: 0 0 8px; font-size: 14px; color: #6B5F50;">📞 <strong>0887 513 752</strong></p>
              <p style="margin: 0 0 8px; font-size: 14px; color: #6B5F50;">📧 <strong>info@dreamdent.eu</strong></p>
              <p style="margin: 0; font-size: 14px; color: #6B5F50;">📍 Плевен, бул. „Русе" №17, ет. 1, каб. 2</p>
            </div>
            <p style="font-size: 13px; color: #6B5F50; margin-top: 24px;">
              С уважение,<br>
              <strong style="color: #1A1208; font-family: Georgia, serif;">Д-р Галя Пенкова и екипът на DreamDent</strong>
            </p>
          </div>
          <div style="padding: 16px 32px; background: #E8DFD0; text-align: center;">
            <p style="font-size: 11px; color: #6B5F50; margin: 0;">
              © DreamDent • <a href="https://dreamdent.eu" style="color: #C8A96E;">dreamdent.eu</a>
            </p>
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Resend error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
  }
};
