"use client"; // Önemli: Bu bileşen client-side'da çalışmalı

import type React from "react";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

interface Props {
  children: React.ReactNode;
}

export function MyThemeProvider({ children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  );
}
