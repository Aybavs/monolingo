import type { Metadata } from "next";
import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import { AuthProvider } from "@/providers";
import { MyThemeProvider } from "@/providers";
import { UserProvider } from "@/providers";

// Google Fontlar
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata
export const metadata: Metadata = {
  title: "Monolingo",
  description: "Dil öğrenmek hiç bu kadar zevkli olmamıştı.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <UserProvider>
            <MyThemeProvider>{children}</MyThemeProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
