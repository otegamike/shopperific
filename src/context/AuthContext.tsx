// Axios client
import api from "../api/client";

// React
import React, { createContext, useState, useEffect } from "react";

//types 
import type { ClientUser } from "../types/clientUser";
import type { AuthContextType } from "../types/authContextInterface";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<ClientUser | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedAccessToken = localStorage.getItem("accessToken");
        if (storedUser && storedAccessToken) {
            setUser(JSON.parse(storedUser));
            setAccessToken(storedAccessToken);
        }
        setIsLoading(false);
    }, []);

    const login = async (credentials: any) => {
        try {
            const response = await api.post("/auth/login", credentials);
            const { user, accessToken } = response.data;
            setUser(user);
            setAccessToken(accessToken);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("accessToken", accessToken);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
