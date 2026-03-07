import Product from "../../models/Product.js"
import Shop from "../../models/Shop.js";
import User from "../../models/User.js";
import Order from "../../models/Order.js";
import { Model } from "mongoose";

export type Models = "user" | "product" | "shop" | "order";

export const getModels = (model: Models): Model<any> => {
    switch (model) {
        case "user":
            return User;
        case "product":
            return Product;
        case "shop":
            return Shop;
        case "order":
            return Order;
        default:
            throw new Error("Invalid model");
    }
}
