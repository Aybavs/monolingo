"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useUser } from "@/context/UserContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <AdminSidebar />
        <div className="flex-1 flex flex-col border">
          <AdminNavbar adminUsername={user?.username || "Aybars Keles"} />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
