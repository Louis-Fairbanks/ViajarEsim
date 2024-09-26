import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

export default createMiddleware({
  // Configure default locale and other locales
  defaultLocale: 'es',
  locales: ['es', 'en'],
  // Use the routing configuration you've defined
  localePrefix: routing.localePrefix,
  // Set default locale detection based on accept-language header
  localeDetection: true,
});

export const config = {
  // Match all pathnames except for
  // - API routes (/api)
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - all files within the public folder
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};