export interface User {
  user_id?: string;
  username: string;
  email: string;
  date_joined?: string;
  password: string;
  user_role: "user" | "admin";
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
