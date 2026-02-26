import Product from "../../models/Product.js"
import Shop from "../../models/Shop.js";
import User from "../../models/User.js";

import { getModels } from "./models.js";

export type models = "user" | "product" | "shop";


const queryLog = (findBy: any, model: string) => {
    return `fetching ${findBy === "all" ? findBy : ''}${model}${findBy !== "all" ? ' by ' : ''} `
}

export const getProduct = async (
    findBy: any,
    reqLimit: number = 12, reqPage: number = 1,
    fields: string = "name price category description images shopName")
    : Promise<{ found: boolean, products?: any, message?: string }> => {

    console.log(queryLog(findBy, "Products"));

    const page = Math.max(Number(reqPage) || 1, 1);
    const limit = Math.min(Number(reqLimit) || 12, 50);

    try {
        const products = await Product.find((findBy === "all") ? {} : findBy)
            .select(fields)
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        return { found: true, products };

    } catch (err: any) {
        console.error(err.message, err);
        return { found: false, message: "error fetching products" }
    }

}

export const getShop = async (
    findBy: any,
    reqLimit: number = 12, reqPage: number = 1,
    fields: string = "shopName shopId description owner")
    : Promise<{ found: boolean, shops?: any, message?: string, error?: string }> => {

    console.log(queryLog(findBy, "Shops"));

    const page = Math.max(Number(reqPage) || 1, 1);
    const limit = Math.min(Number(reqLimit) || 12, 50);

    try {
        const shops = await Shop.find((findBy === "all") ? {} : findBy)
            .select(fields)
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        if (shops.length === 0) return { found: false, message: "No shops found" };
        return { found: true, shops };

    } catch (err: any) {
        console.error(err.message, err);
        return { found: false, error: "error fetching Shops" }
    }

}

export const getUser = async (
    findBy: any,
    reqLimit: number = 12, reqPage: number = 1,
    fields: string = "firstName lastName email role")
    : Promise<{ found: boolean, user?: any, message?: string }> => {

    console.log(queryLog(findBy, "Shops"));

    const page = Math.max(Number(reqPage) || 1, 1);
    const limit = Math.min(Number(reqLimit) || 12, 50);

    try {
        const user = await User.find((findBy === "all") ? {} : findBy)
            .select(fields)
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        return { found: true, user };

    } catch (err: any) {
        console.error(err.message, err);
        return { found: false, message: "error fetching Users" }
    }

}

export const getFromDb = async (
    model: "user" | "product" | "shop",
    findBy: any,
    fields: string = "_id",
    reqLimit: number = 12, reqPage: number = 1)
    : Promise<{ found: boolean, data?: any, message?: string }> => {


    const Model = getModels(model);

    console.log(queryLog(findBy, model), findBy);

    const page = Math.max(Number(reqPage) || 1, 1);
    const limit = Math.min(Number(reqLimit) || 12, 50);

    try {
        const data = await Model.find((findBy === "all") ? {} : findBy)
            .select(fields)
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        if (!data) {
            throw new Error(`couldn't find ${fields} with ${findBy} in ${model}`)
        };

        return { found: true, data };

    } catch (err: any) {
        console.error(err.message, err);
        return { found: false, message: "error fetching Users" }
    }
}

export const findOneFromDB = async <T>(
    model: models,
    findBy: object,
    selectFields: string = "",
    options: object = { lean: true }):
    Promise<
        | { found: true, payload: T }
        | { found: false }
    > => {

    let Model = getModels(model);

    try {
        const payload = await Model.findOne(findBy, selectFields, options);
        if (!payload) {
            throw new Error(`couldn't find ${selectFields} with ${findBy} in ${model}`);
        };
        return { found: true, payload };

    } catch (err: any) {
        console.log(err.message)
        return { found: false }
    }

}

export interface DBQueryParameters {
    findBy?: object,
    selectFields?: string | object,
    options?: object,
    pagination?: { limit: number, page: number }
}

export const getManyFromDB = async <ModelSchema>(
    model: models,
    queryParameters: DBQueryParameters = {}):
    Promise<
        | { found: true, payload: ModelSchema[] }
        | { found: false }
    > => {

    const findBy = queryParameters.findBy || {};
    const selectFields = queryParameters.selectFields || "";
    const options = queryParameters.options || { lean: true };
    const pagination = queryParameters.pagination || { limit: 12, page: 1 };

    const limit = Math.min(pagination.limit, 50);
    const page = Math.max(pagination.page, 1);


    const skip = (page - 1) * limit;


    let Model = getModels(model);

    try {
        const payload = await Model.find(findBy, selectFields, { skip, limit, ...options });
        if (!payload) {
            throw new Error(`couldn't find ${selectFields} with ${findBy} in ${model}`);
        };
        return { found: true, payload };

    } catch (err: any) {
        console.log(err.message)
        return { found: false }
    }

}