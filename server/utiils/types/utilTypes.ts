import type { Request } from "express";
import e from "express";

export type TypedRequest<T> = Request<{}, {}, T>;

export interface loginRequestBody {
    email: string;
    password: string;
};

export interface registerRequestBody {
    email: string;
    password: string;
    role: "buyer" | "seller";
}
