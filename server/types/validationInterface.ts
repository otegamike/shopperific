export type Role = "buyer" | "seller" | "guest" | "admin";

export interface userObj {
    userId: string;
    email: string;
    role: Role;
}

export interface shopList {
    _id: string;
    shopName: string;
}

export interface reqVariables {
    validated?: boolean;
    deviceId?: string;
    cartId?: string;
    shopRef?: string;
    sellerId?: string;
    shopId?: string;
    shopName?: string;
    shopList?: shopList[];
    productId?: string;
    orderId?: string;
}

export type ReqUserObj = userObj & reqVariables;