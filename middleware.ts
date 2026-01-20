import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
    const nonce = crypto.randomUUID();

    // Get the host to check if we're running through ngrok or other proxy
    const host = request.headers.get('host') || '';
    const isNgrok = host.includes('ngrok');
    const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1');

    // Build CSP header - more permissive for ngrok
    let cspHeader = `
    default-src 'self' ${isNgrok ? host : ''};
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://maps.googleapis.com https://vercel.live ${isNgrok ? host : ''};
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com ${isNgrok ? host : ''};
    img-src 'self' blob: data: https://*.stripe.com https://maps.gstatic.com https://images.unsplash.com https://*.unsplash.com ${isNgrok ? host : ''};
    font-src 'self' https://fonts.gstatic.com data: ${isNgrok ? host : ''};
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors ${isNgrok ? "'self' " + host : "'none'"};
    frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://www.google.com ${isNgrok ? host : ''};
    connect-src 'self' https://api.stripe.com https://maps.googleapis.com ws: wss: ${isNgrok ? 'https://*.ngrok.io https://*.ngrok-free.app https://*.ngrok.app' : ''};
  `.replace(/\s{2,}/g, ' ').trim();

    // Determine if it's an API route or static asset to skip intl
    const pathname = request.nextUrl.pathname;
    const isApiRoute = pathname.startsWith('/api');
    const isStaticAsset = pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.match(/\.(.*)$/);

    let response: NextResponse;

    if (isApiRoute || isStaticAsset) {
        response = NextResponse.next();
    } else {
        response = intlMiddleware(request);
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('Content-Security-Policy', cspHeader);

    // Set Security Headers (adjust for ngrok)
    response.headers.set('Content-Security-Policy', cspHeader);
    response.headers.set('X-DNS-Prefetch-Control', 'on');

    // Don't set HSTS for ngrok (it's not HTTPS in dev)
    if (!isNgrok && !isLocalhost) {
        response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    }

    // More permissive frame options for ngrok
    if (isNgrok) {
        response.headers.set('X-Frame-Options', 'ALLOWALL');
    } else {
        response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    }

    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), browsing-topics=()');

    return response;
}

export const config = {
    matcher: [
        // Enable a redirect to a matching locale at the root
        '/',

        // Set a cookie to remember the last locale for all requests that are not static assets or API routes
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ],
};
