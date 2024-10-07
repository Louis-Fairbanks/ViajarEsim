import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

export default createMiddleware({
  // Configure default locale and other locales
  defaultLocale: 'es',
  locales: ['es', 'en', 'br'],
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

// import createMiddleware from 'next-intl/middleware';
// import {NextRequest} from 'next/server';
 
// export default async function middleware(request: NextRequest) {
//   // Step 1: Use the incoming request (example)
//   const defaultLocale = request.headers.get('x-your-custom-locale') || 'en';
 
//   // Step 2: Create and call the next-intl middleware (example)
//   const handleI18nRouting = createMiddleware({
//     locales: ['en', 'de'],
//     defaultLocale
//   });
//   const response = handleI18nRouting(request);
 
//   // Step 3: Alter the response (example)
//   response.headers.set('x-your-custom-locale', defaultLocale);
 
//   return response;
// }
 
// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(de|en)/:path*']
// };