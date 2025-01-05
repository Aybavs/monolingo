// Kullanıcı bilgisi
export interface User {
  userId: number;
  username: string;
  exp: number;
  iat: number;
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

export type UserRole = "user" | "admin";
