"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/context";
import {
  login as loginService,
  logout as logoutService,
  register as registerService,
} from "@/lib/auth/authService";

import type { User } from "@/types";
import { decode } from "jsonwebtoken";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // Login service çağrısı
      const token = await loginService(email, password);

      if (!token) {
        throw new Error("Token alınamadı.");
      }

      // Token'ı decode et
      const decodedToken = decode(token) as User | null;

      if (!decodedToken) {
        throw new Error("Token decode edilemedi.");
      }

      // User ataması
      const { userId, username, exp, iat, role } = decodedToken;

      const user: User = {
        userId,
        username,
        exp,
        iat,
        role,
      };

      setUser(user);
      setIsAuthenticated(true);
      setError(null);

      // Role'e göre yönlendirme
      if (user.role === "admin") {
        router.push("/admin/dashboard");
      } else if (user.role === "user") {
        router.push("/learn");
      } else {
        throw new Error("Geçersiz kullanıcı rolü.");
      }
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
      await registerService(username, email, password);
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
