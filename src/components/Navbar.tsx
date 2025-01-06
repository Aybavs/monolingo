"use client";

import { Button } from "@/components/ui/button";
import ToggleThemeButton from "@/components/ToggleThemeButton"; // Daha önce oluşturduğun theme toggle
import { useAuth } from "@/hooks/useAuth"; // Authentication hook

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b-8 lg:w-[70%] mx-auto">
      <div className="text-lg font-bold  text-gray-800 dark:text-yellow-500">
        monolingo
      </div>
      <div className="flex items-center space-x-4">
        <ToggleThemeButton />
        <Button
          variant="outline"
          onClick={logout}
          className="text-sm text-red-500 border-red-500 hover:bg-red-100 dark:hover:bg-red-800"
        >
          Log Out
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
