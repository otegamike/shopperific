import mongoose, {Types} from "mongoose";

export const db = mongoose;
export { Types };

export const toObjectId = (id: string) => new Types.ObjectId(id);