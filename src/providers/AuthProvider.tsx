"use client";
import { useState, useCallback } from "react";
import type { User } from "@/types";
import { AuthContext } from "@/context/AuthContext";
import { post } from "@/services/api"; // ApiHelper'ı kullanıyoruz

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await post("/auth/login", { email, password });
      setIsAuthenticated(true);
      setUser(response.user);
      sessionStorage.setItem("token", response.token);
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
      await post("/logout"); // Logout için API çağrısı
      setIsAuthenticated(false);
      setUser(null);
      sessionStorage.removeItem("token"); // Token'ı temizleme
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }, []);

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      setIsLoading(true);
      const response = await post("/auth/login", { username, email, password });
      setIsAuthenticated(true);
      setUser(response.user);
      sessionStorage.setItem("token", response.token);
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
