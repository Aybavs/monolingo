"use client";

import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export default function ToggleThemeButton() {
  const { theme, setTheme } = useTheme();

  const isDarkMode = theme === "dark";

  return (
    <div className="flex items-center space-x-2">
      <label
        htmlFor="theme-switch"
        className="text-sm font-medium text-gray-900 dark:text-gray-100"
      >
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </label>
      <Switch
        id="theme-switch"
        checked={isDarkMode}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
    </div>
  );
}
