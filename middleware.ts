import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define role-based routes
const roleRoutes: Record<string, string[]> = {
    client: ['c'],
    developer: ['dev'],
    ceo: ['ceo'],
    manager: ['ceo'],
};

export async function middleware(request: NextRequest) {

    
    // Mocked function to get the user's role. Replace with actual authentication logic.

    const token = await getToken({ req: request });

    const userRole = (token?.user as { role: string })?.role;
    console.log("userRole: ", userRole);
    const pathname = request.nextUrl.pathname;

    // If role is not found, redirect to a login or error page
    if (!userRole) {
        // return NextResponse.redirect(new URL('/auth/c-sign-in', request.url));
        return
    }

    // Check if the route matches the user's role
    const allowedRoutes = roleRoutes[userRole] || [];
    const isAllowed = pathname.split('/')[1] === allowedRoutes[0];

    

    // If not allowed, redirect back to where they came from
    if (!isAllowed) {
        const referer = request.headers.get('referer') || '/welcome'; // Fallback to the home page
        return NextResponse.redirect(new URL(referer, request.url));
    }


    // Allow the request to proceed
    return NextResponse.next();
}

// Match all routes for middleware
export const config = {
    matcher: ['/c/:path*', '/dev/:path*', '/ceo/:path*', ],
};