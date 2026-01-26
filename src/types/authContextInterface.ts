import type { ClientUser } from "./clientUser";

export interface AuthContextType {
  user: ClientUser | null;
  accessToken: string | null;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}