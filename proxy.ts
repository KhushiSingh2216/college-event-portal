import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  // Check if Authorization header exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Access Denied. No Token Provided." },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify JWT
    jwt.verify(token, process.env.JWT_SECRET!);

    // Continue to the requested route
    return NextResponse.next();
  } catch {
    return NextResponse.json(
      { message: "Invalid Token." },
      { status: 401 }
    );
  }
}

// Protect these API routes
export const config = {
  matcher: [
    "/api/events/:path*",
    "/api/registrations/:path*",
    "/api/announcements/:path*",
  ],
};