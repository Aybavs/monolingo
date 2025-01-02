"use client";

import ToggleThemeButton from "@/components/ToggleThemeButton";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function AdminNavbar({ adminUsername }: { adminUsername: string }) {
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      {/* Sidebar Toggle Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Toggle Theme Button */}
        <ToggleThemeButton />

        <Separator
          orientation="vertical"
          className="h-6 bg-gray-300 dark:bg-gray-600"
        />

        {/* Admin Username */}
        <span className="text-gray-600 dark:text-gray-300 font-medium">
          {adminUsername}
        </span>
      </div>
    </nav>
  );
}
