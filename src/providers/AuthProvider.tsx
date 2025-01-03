"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/context";
import {
  login as loginService,
  logout as logoutService,
  register as registerService,
} from "@/lib/auth/authService"; // Fonksiyonları içe aktarıyoruz

import type { User } from "@/types";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const user = await loginService(email, password); // login fonksiyonunu çağır
      setIsAuthenticated(true);
      setUser(user);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("Login failed:", errorMessage);
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(async () => {
    try {
      await logoutService(); // logout fonksiyonunu çağır
      setIsAuthenticated(false);
      setUser(null);
      router.push("/auth/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }, [router]);

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      setIsLoading(true);
      const response = await registerService(username, email, password); // register fonksiyonunu çağır
      console.log("Register successful:", response.message);
      router.push("/auth/login");
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("Register failed:", errorMessage);
      setError("Register failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isLoading,
        error,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
