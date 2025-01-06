"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Home,
  Users,
  BookOpen,
  ListChecks,
  Settings as SettingsIcon,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Chapters",
    url: "/admin/chapters",
    icon: BookOpen,
  },
  {
    title: "Lessons",
    url: "/admin/lessons",
    icon: ListChecks,
  },
  {
    title: "Exercises",
    url: "/admin/exercises",
    icon: ListChecks,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: SettingsIcon,
  },
];

export function AdminSidebar() {
  const { logout } = useAuth();
  const pathname = usePathname(); // Mevcut yolu alır

  return (
    <Sidebar className="h-screen flex flex-col justify-between">
      <SidebarContent className="p-4">
        {/* Admin Panel Header */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
            Admin Panel
          </SidebarGroupLabel>
        </SidebarGroup>

        {/* Menu Items */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <React.Fragment key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-3 p-2 rounded-md ${
                          pathname === item.url
                            ? "bg-gray-300 dark:bg-zinc-700"
                            : "hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        <item.icon
                          className={`h-6 w-6 ${
                            pathname === item.url
                              ? "text-gray-900 dark:text-white"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        />
                        <span
                          className={`text-lg font-medium ${
                            pathname === item.url
                              ? "text-gray-900 dark:text-white"
                              : "text-gray-800 dark:text-gray-100"
                          }`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Separator Between Menu Items */}
                  {index < items.length - 1 && (
                    <Separator className="my-2 bg-gray-300 dark:bg-gray-600" />
                  )}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Separator */}
      <Separator className="bg-gray-300 dark:bg-gray-600" />

      {/* Log Out Button */}
      <div className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                onClick={() => logout?.()}
                variant="outline"
                className="flex items-center gap-3 p-4 text-red-500 hover:bg-red-100 dark:hover:bg-red-500 dark:hover:text-white rounded-md"
              >
                <LogOut className="h-6 w-6" />
                <span className="text-lg font-semibold">Log Out</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </Sidebar>
  );
}
