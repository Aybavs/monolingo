import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  const { pathname, origin } = req.nextUrl;

  // Token yoksa yetkisiz sayfaya yönlendir
  if (!token) {
    console.log("Token bulunamadı. Yetkisiz sayfaya yönlendiriliyor.");
    if (pathname.startsWith("/learn") || pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/unauthorized", origin));
    }
    return NextResponse.next();
  }

  try {
    // Token doğrula
    const decodedToken = await jwtVerify(
      token,
      new TextEncoder().encode(SECRET_KEY)
    );

    const { role } = decodedToken.payload;

    // Admin sayfasına erişim kontrolü
    if (pathname.startsWith("/admin") && role !== "admin") {
      console.log("Yetersiz yetki: Admin alanına erişim reddedildi.");
      return NextResponse.redirect(new URL("/unauthorized", origin));
    }

    // Kullanıcı sayfasına erişim kontrolü
    if (pathname.startsWith("/learn") && role !== "user") {
      console.log("Yetersiz yetki: Kullanıcı alanına erişim reddedildi.");
      return NextResponse.redirect(new URL("/unauthorized", origin));
    }

    // Tüm kontroller geçtiyse devam et
    return NextResponse.next();
  } catch (err) {
    console.error("Token doğrulama hatası:", err);
    return NextResponse.redirect(new URL("/auth/login", origin));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/learn/:path*"],
};
