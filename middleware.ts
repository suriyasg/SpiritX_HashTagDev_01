import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET_KEY = "SECRET_KEY";

export async function middleware(request: NextRequest) {
  const token = (await cookies()).get("token")?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthPage = pathname === "/signin" || pathname === "/signup";
  const isMainPage = pathname === "/";

if (token) {
    try {
        const secret = process.env.SECRET_KEY as string;
        const decoded = jwt.verify(token, secret);

        if (decoded) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    } catch (error) {
        console.error("JWT verification failed:", error);
        const response = NextResponse.next();
        response.cookies.delete("token");
        return response;
    }
} else {
    if (!isAuthPage) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }
}

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/signup"], 
};
