// React
import React, { createContext, useState, useEffect } from "react";

//types 
import type { ClientUser } from "../types/clientUser";
import type { AuthContextType } from "../types/authContextInterface";

// services
import { loginService } from "../services/authentication/loginService";

// types
import type { LoginCredentials } from "../types/authContextInterface";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<ClientUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const updateUser = (newUser : ClientUser) => {
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
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
        <AuthContext.Provider value={{ user, login, logout, updateUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
