import { Router , Request } from "express";
import { requireSeller } from "../../middleware/requireSeller.js";

// services
import { aggregateCount, type AggregateCountObj, ProjectionParameters } from "../../services/documentCount.js";
import { getFromDb } from "../../services/fetchFromDb.js";

// types
import type { TypedResponse } from "../../utils/types/utilTypes.js";
import type { tResponseError } from "../../types/routesInterface.js";

const router = Router();

router.post("/products", async (req: Request, res) => {
    const sellerId = req.user?.userId;
    const {limit, page} = req.body;

    if (!sellerId) {
        console.log("invalid seller id.")
        return res.status(400).json({ errorMsg: "Seller not found" });
    }

    const countParameters: AggregateCountObj[] = [
        {fieldName: "totalProducts", filter: {sellerId}},
        {fieldName: "inStock", filter: {sellerId, stock: {$gt: 0}}},
        {fieldName: "outOfStock", filter: {sellerId, stock: {$eq: 0}}},
        {fieldName: "totalInventory", filter: {sellerId}, sumField: "stock"}
    ]



    const projectionParameters: ProjectionParameters = {
        match: {sellerId},
        project: { 
            _id: 0,
            images: 1, 
            name: 1, 
            description: 1, 
            price: 1,
            stock: 1, 
            category: 1
        },
        skip: page,
        limit: limit
    }

    const dashboardProductsData = await aggregateCount("product", countParameters, projectionParameters);

    return res.status(200).json(dashboardProductsData);

    

});

export default router;






