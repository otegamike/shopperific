export type Role = "buyer" | "seller" | "admin";

export interface userObj {
    userId: string;
    email: string;
    role: Role;
}

export interface reqVariables {
    shopOwnerId?: string;
    shopName?: string;
    productId?: string;
    orderId?: string;
}

export type ReqUserObj = userObj & reqVariables;