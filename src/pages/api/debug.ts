export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const GET: APIRoute = async () => {
  const cfEnv = env as Record<string, unknown>;
  return new Response(JSON.stringify({
    hasResendKey: !!cfEnv.RESEND_API_KEY,
    hasContactEmail: !!cfEnv.CONTACT_EMAIL,
    keys: Object.keys(cfEnv),
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
