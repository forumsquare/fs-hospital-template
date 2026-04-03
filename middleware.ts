import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define protected routes that start with /account
  // const isProtectedRoute = path.startsWith("/account");

  // Get the token from cookies
  const token = request.cookies.get("refreshToken")?.value;


  if (path.startsWith("/signup") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // If it's a protected route and there's no token, redirect to login
  // if (isProtectedRoute && !token) {
  //   const response = NextResponse.redirect(new URL("/signup", request.url));
  //   return response;
  // }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ["/:path*"],
};
