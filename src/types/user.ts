export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
