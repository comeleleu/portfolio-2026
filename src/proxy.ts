import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    // Clone the URL to manipulate without affecting the original request
    const url = request.nextUrl.clone();
    const { pathname } = url;
    
    // Detect locale prefix
    const hasEn = pathname.startsWith('/en/') || pathname === '/en';
    const hasFr = pathname.startsWith('/fr/') || pathname === '/fr';
    let locale = 'en';
    
    if (hasEn) {
        locale = 'en';
    } else if (hasFr) {
        locale = 'fr';
    } else {
        const acceptLang = request.headers.get('accept-language') || '';
        const supportedLocales = ['en', 'fr'];
        
        // Parse the Accept-Language header and select the first supported locale (en or fr)
        const languagePreferences = acceptLang
            .split(',')
            .map((segment) => {
                const [langPart, qPart] = segment.trim().split(';q=');
                const lang = langPart.trim();
                const q = qPart ? parseFloat(qPart) : 1.0;
                
                return { lang, q };
            })
            .sort((a, b) => b.q - a.q);

        for (const { lang } of languagePreferences) {
            // Check for exact match or prefix (e.g., en-CA should match 'en')
            const baseLang = lang.split('-')[0];

            if (supportedLocales.includes(baseLang)) {
                locale = baseLang;
                break;
            }
        }
    }
    
    if (hasEn) {
        url.pathname = pathname.replace(/^\/en/, '') || '/';
    } else if (hasFr) {
        url.pathname = pathname.replace(/^\/fr/, '') || '/';
    } else if (pathname === '/' || pathname === '') {
        url.pathname = `/${locale}`;
        
        return NextResponse.redirect(url);
    }

    // Inject the locale into request headers for downstream components
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', locale);

    // Rewrite request to the new pathname while preserving modified headers
    return NextResponse.rewrite(url, {
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}