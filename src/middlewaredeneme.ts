import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  const { pathname, origin } = req.nextUrl;

  // Token yoksa yetkisiz sayfaya yönlendir
  if (!token) {
    console.log("Token bulunamadı.");
    if (pathname.startsWith("/learn") || pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/unauthorized", origin));
    }
    return NextResponse.next();
  }

  // Token doğrula
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY) as { role: string };
    console.log("Token geçerli. Rol:", decodedToken.role);

    // Admin kontrolü
    if (pathname.startsWith("/admin") && decodedToken.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", origin));
    }

    // Kullanıcı kontrolü
    if (pathname.startsWith("/learn") && decodedToken.role !== "USER") {
      return NextResponse.redirect(new URL("/unauthorized", origin));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Token doğrulama hatası:", err);
    req.cookies.delete("token");
    return NextResponse.redirect(new URL("/auth/login", origin));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/learn/:path*"],
};
