export interface User {
  id: number;
  username: string;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (values: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}
