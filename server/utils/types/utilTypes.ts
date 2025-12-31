import type { Request, Response } from "express";

export type TypedRequest<T> = Request<{}, {}, T>;
export type TypedResponse<T> = Response<T>;

export interface loginRequestBody {
    deviceId: string;
    email: string;
    password: string;

};

export interface registerRequestBody {
    deviceId: string;
    email: string;
    password: string;
    role: "buyer" | "seller";
}

export interface NewUSerOBj {
    userId: string;
    email: string;
    role: "buyer" | "seller";
}

type baseReqUser = NewUSerOBj;

export interface AccessToken {
    accessToken?: string;
}

export interface reqVariables {
    shopOwnerId?: string;
    shopName?: string;
    productId?: string;
    orderId?: string;
}

export interface AuthUser {
    userId: string;
    deviceId: string;
}

export type ReqUser = baseReqUser & AccessToken & reqVariables;