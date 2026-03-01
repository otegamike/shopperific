import { Role } from "./validationInterface.js";
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface ClientUser {
    firstName: string;
    email: string;
    role: Role;
}

export interface reqVariables {
    shopOwnerId?: string;
    shopName?: string;
    productId?: string;
    orderId?: string;
}

export interface ReqUserObj {
    user: ClientUser;
    variables?: reqVariables;
}

interface LoginResponseSuccess {
    user: ClientUser;
    message: string;
}

interface LoginResponseError {
    errorMsg: string;
}

export type LoginResponse = LoginResponseSuccess | LoginResponseError;



