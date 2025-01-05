import type { passwordSchema } from "@/schemas/passwords";
export interface User {
  user_id?: string;
  username: string;
  email: string;
  date_joined?: string;
  password: typeof passwordSchema;
  role: "user" | "admin";
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
