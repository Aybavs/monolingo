// Kullanıcı bilgisi
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

// Auth context türü
export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>; // API çağrısına uygun
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>; // API çağrısına uygun
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

// Giriş ve çıkış API istekleri için türler
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
export type UserRole = "user" | "admin";
