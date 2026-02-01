import Product from "../models/Product.js"
import Shop from "../models/Shop.js";
import User from "../models/User.js";
import { Model } from "mongoose";

export type Models = "user" | "product" | "shop";

export const getModels = (model: Models): Model<any> => {
    switch (model) {
        case "user":
            return User;
        case "product":
            return Product;
        case "shop":
            return Shop;
        default:
            throw new Error("Invalid model");
    }
}
