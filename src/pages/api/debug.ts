export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  const cfEnv = (locals as { runtime?: { env?: Record<string, unknown> } }).runtime?.env ?? {};

  return new Response(JSON.stringify({
    hasResendKey: !!cfEnv.RESEND_API_KEY,
    hasContactEmail: !!cfEnv.CONTACT_EMAIL,
    hasImportMetaResend: !!import.meta.env.RESEND_API_KEY,
    keys: Object.keys(cfEnv),
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
