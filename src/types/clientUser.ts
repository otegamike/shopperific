export interface ClientUser {
    firstName: string;
    email: string;
    role: "buyer" | "seller" | "guest" | "Admin";
}