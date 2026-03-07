import type { ClientUser } from "./clientUser";
import type { ClientCart } from "./CartInterface";

export interface AuthContextType {
  user: ClientUser | null;
  cart: ClientCart | null;
  updateUser: (newUser: ClientUser) => void ;
  updateCart: (newCart: ClientCart) => void;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;

  isLoading: boolean;
}

// credentials
export interface LoginCredentials {
    email: string;
    password: string;
}

export const EmptyLoginCredentials: LoginCredentials = {
    email: "",
    password: ""
}

export interface RegisterCredentials {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const EmptyRegisterCredentials: RegisterCredentials = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
}
