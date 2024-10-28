import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

export default createMiddleware({
  // Configure default locale and other locales
  defaultLocale: 'es',
  locales: ['es', 'en', 'br', 'de', 'it', 'fr'],
  // Use the routing configuration you've defined
  localePrefix: routing.localePrefix,
  // Set default locale detection based on accept-language header
  localeDetection: true,
});

export const config = {
  matcher: ['/', '/(es|en|br|de|it|fr)/api', '/(es|en|br|de|it|fr)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};