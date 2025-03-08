import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = (await cookies()).get("token")?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isHomePage = pathname === "/home";

  console.log("Current URL:", request.url);
  console.log("Token:", token ?? "No token");

  if (token) {
    try {
      const secret = process.env.SECRET_KEY as string;
      const { payload: decoded } = await jwtVerify(token, new TextEncoder().encode(secret));

      if (decoded) {
        console.log("User is authenticated.");
        if (isAuthPage) {
          return NextResponse.redirect(new URL("/home", request.url));
        }
        return NextResponse.next();
      }
    } catch (error) {
      console.error("JWT verification failed:", error);
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }
  } else {
    // No token present
    console.log("No token found");

    if (isHomePage) {
      console.log("Redirecting to /login from /home");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/home"], // Ensure /home is included
};
