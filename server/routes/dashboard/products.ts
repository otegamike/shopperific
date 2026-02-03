import { Router , Request } from "express";
import { requireSeller } from "../../middleware/requireSeller.js";

// services
import { aggregateCount, type aggregateCountObj } from "../../services/documentCount.js";
import { getFromDb } from "../../services/fetchFromDb.js";

// types
import type { TypedResponse } from "../../utils/types/utilTypes.js";
import type { tResponseError } from "../../types/routesInterface.js";

const router = Router();

router.post("/products", async (req: Request, res) => {
    const sellerId = req.user?.userId;

    if (!sellerId) {
        console.log("invalid seller id.")
        return res.status(400).json({ errorMsg: "Seller not found" });
    }

    const countParameters: aggregateCountObj[] = [
        {fieldName: "totalProducts", filter: {sellerId}},
        {fieldName: "inStock", filter: {sellerId, stock: {$gt: 0}}},
        {fieldName: "outOfStock", filter: {sellerId, stock: {$eq: 0}}},
        {fieldName: "totalInventory", filter: {sellerId}, sumField: "stock"}
    ]
    const productsCount = await aggregateCount("product", countParameters);

    // GetProduct Parameters
    const {limit, page} = req.body;
    const findBy = {sellerId};
    const selectFields = "-_id name price stock description images category";

    const getProducts = await getFromDb("product", findBy, selectFields, limit, page);

    const DashboardProductsData = {
        productsStats: productsCount,
        productsData: getProducts.data
    }
    
    return res.status(200).json(DashboardProductsData);

    

});

export default router;






