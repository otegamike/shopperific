// React
import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

//types 
import type { ClientUser } from "../types/clientUser";
import type { AuthContextType } from "../types/authContextInterface";
import type { LoginCredentials } from "../types/authContextInterface";
import type { ClientCart } from "../types/CartInterface";

// services
import { loginService } from "../services/authentication/loginService";
import { validateUser as validateUserService } from "../services/authentication/validateUser";


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<ClientUser | null>(null);
    const [cart, setCart] = useState<ClientCart | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();

    // Check if "auth" exists in the current path
    const isAuthPage = location.pathname.includes('auth');

    const validateUser = async () => {
        const validateResponse = await validateUserService();
        if ("errorMsg" in validateResponse) {
            console.error("Validation failed:", validateResponse.errorMsg);
            return;
        }
        const { user, cart } = validateResponse;

        updateUser(user) ;
        updateCart(cart)  ;
    };

    useEffect(() => {
        if (isAuthPage) return;

        validateUser();
        const storedUser = localStorage.getItem("user");
        const storedCart = localStorage.getItem("cart");
        
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
        setIsLoading(false);
    }, []);

    const updateUser = (newUser : ClientUser) => {
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    }

    const updateCart = (newCart : ClientCart) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    const login = async (credentials: LoginCredentials) => {
        const loginResponse = await loginService(credentials);
        if ("errorMsg" in loginResponse) {
            console.error("Login failed:", loginResponse.errorMsg);
            return;
        }
        const { user } = loginResponse;
        updateUser(user) ;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, cart, login, logout, updateUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
