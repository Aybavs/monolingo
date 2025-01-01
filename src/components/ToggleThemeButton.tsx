"use client";
import { useTheme } from 'next-themes';

export default function ToggleThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
