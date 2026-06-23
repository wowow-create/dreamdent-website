import { defineMiddleware } from 'astro:middleware';

// Keystatic v5.1.0 still uses the Astro v5 API (Astro.locals.runtime.env)
// which was removed in Astro v6. This middleware polyfills it back so
// Keystatic's API routes can access Worker environment variables.
export const onRequest = defineMiddleware(async (context, next) => {
  if (!(context.locals as any).runtime) {
    try {
      const { env } = await import('cloudflare:workers');
      (context.locals as any).runtime = { env };
    } catch {
      // Not in Cloudflare Workers context (local dev without platformProxy)
    }
  }
  return next();
});
