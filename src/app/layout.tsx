import type { Metadata } from "next";
import './globals.css';

import { Geist, Geist_Mono } from 'next/font/google';

import { AuthProvider } from '@/providers'; // Senin AuthProvider'ın
import { MyThemeProvider } from '@/providers/ThemeProvider';

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
          {/* Tema yönetimini sağlayan provider'ı AuthProvider veya üst/alt sırada sarmalayabilirsin */}
          <MyThemeProvider>{children}</MyThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
