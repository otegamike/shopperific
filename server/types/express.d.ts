import type { ReqUserObj } from "./validationInterface.ts";

declare global {
  namespace Express {
    interface Request {
      user?: ReqUserObj;
    }
  }
}

export {};