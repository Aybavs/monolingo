"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { getCredits } from "@/lib/user/userService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoLogOut } from "react-icons/io5";

const Navbar = () => {
  const { logout } = useAuth();
  const [credits, setCredits] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await getCredits();
        setCredits(response.credits); // Updated to access credits from response object
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    };

    fetchCredits();
  }, []);

  const handlePaymentRedirect = () => {
    router.push("/payment");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b-8 border-purple-950 lg:w-[70%] mx-auto">
      <div className="text-lg font-bold text-gray-800 dark:text-yellow-500">
        monolingo
      </div>
      <div className="flex items-center space-x-4 bg-w">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{String(credits)} Credits</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePaymentRedirect}
            className="text-green-500 border-green-500 hover:bg-green-100 dark:hover:bg-green-800"
          >
            +
          </Button>
        </div>
        <Button
          variant="ghost"
          onClick={logout}
          className="p-3 text-red-500 hover:bg-red-100 dark:hover:bg-red-800 rounded-full "
        >
          <IoLogOut />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
