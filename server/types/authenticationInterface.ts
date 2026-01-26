export interface LoginCredentials {
    email: string;
    password: string;
}

export interface ClientUser {
    firstName: string;
    email: string;
    role: "buyer" | "seller" | "Admin";
}