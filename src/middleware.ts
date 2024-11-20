import { NextResponse, type NextRequest } from "next/server";
import { verifyAuth } from "./@core/lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const verifiedToken = token && (await verifyAuth(token));
  const isAuthPage = request.nextUrl.pathname === "/login";

  // Redirect to posts if logged in and trying to access login page
  if (verifiedToken && isAuthPage) {
    return NextResponse.redirect(new URL("/protected/posts", request.url));
  }

  // Redirect to login if not logged in and trying to access protected routes
  if (
    !verifiedToken &&
    !isAuthPage &&
    request.nextUrl.pathname.startsWith("/protected")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If trying to access admin routes without admin role
  if (
    verifiedToken &&
    request.nextUrl.pathname.startsWith("/protected/admin") &&
    verifiedToken.role !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/protected/posts", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*", "/login"],
};
