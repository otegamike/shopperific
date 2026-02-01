import { Router , Request } from "express";
import { requireSeller } from "../../middleware/requireSeller.js";
import { getFromDb } from "../../services/fetchFromDb.js";

// services
import { aggregateCount, type aggregateCountObj } from "../../services/documentCount.js";

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

    const countParameters: aggregateCountObj[] = [{fieldName: "products", filter: {sellerId}}]
    const productsCount = await aggregateCount("product", countParameters);


    return res.status(200).json(productsCount);

});

export default router;






