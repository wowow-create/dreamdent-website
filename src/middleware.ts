import { defineMiddleware } from 'astro:middleware';

// Keystatic v5.1.0 still uses the Astro v5 API (Astro.locals.runtime.env)
// which was removed in Astro v6. Astro v6 adds an error-throwing getter on
// locals.runtime.env. We override that getter via Object.defineProperty so
// Keystatic's API routes can access Worker environment variables.
export const onRequest = defineMiddleware(async (context, next) => {
  try {
    const { env } = await import('cloudflare:workers');
    const runtime = (context.locals as any).runtime;
    if (runtime) {
      Object.defineProperty(runtime, 'env', {
        get: () => env,
        configurable: true,
      });
    } else {
      (context.locals as any).runtime = { env };
    }
  } catch {
    // Not in Cloudflare Workers context (local dev without platformProxy)
  }
  return next();
});
