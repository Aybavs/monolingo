"use client";

import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export default function ToggleThemeButton() {
  const { theme, setTheme } = useTheme();

  const isDarkMode = theme === "dark";

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme-switch"
        checked={isDarkMode}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
    </div>
  );
}
