import { ReqUser } from "../utils/types/utilTypes";

declare global {
  namespace Express {
    interface Request {
      user?: ReqUser;
    }
  }
}

export {};