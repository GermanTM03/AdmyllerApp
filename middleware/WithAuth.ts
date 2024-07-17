
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory } from './StackMiddleware';
import { SECRET } from '@/src/utils/environment';

export const WithAuthorization: MiddlewareFactory = (next) => {

    return async (req: NextRequest, event: NextFetchEvent) => {

        const token = await getToken({ req, secret: SECRET });
        const isAuthenticated = !!token;
        const isPublicAsset = req.nextUrl.pathname.startsWith('/assets/');
        const isSignUp = req.nextUrl.pathname.startsWith('/register');

        if (isPublicAsset || isSignUp)
            return NextResponse.next();

        if (req.nextUrl.pathname == "/api/auth/error" && req.nextUrl.searchParams.get("error") == "AccessDenied")
            return NextResponse.redirect(new URL('/signIn', req.nextUrl.origin))

        if (req.nextUrl.pathname.startsWith('/login') && isAuthenticated)
            return NextResponse.redirect(new URL('/start', req.url));

        if (isAuthenticated)
            return next(req, event)

        const authMiddleware = withAuth({
            pages: {
                signIn: `/login`
            },
        });

        // @ts-expect-error
        return authMiddleware(req, event)
    }
}