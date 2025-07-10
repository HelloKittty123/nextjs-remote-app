import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  console.log(url);
  
  if (!request.cookies.get("access_token") && !url.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  else if(request.cookies.get("access_token") && url.startsWith('/login')) {
    return NextResponse.redirect(new URL("/account-profile", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/account-profile/:path*", "/login"],
};
