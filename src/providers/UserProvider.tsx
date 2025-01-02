"use client";
import type React from "react";
import { useState } from "react";
import { UserContext } from "@/context";
import type { User } from "@/types/user";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
