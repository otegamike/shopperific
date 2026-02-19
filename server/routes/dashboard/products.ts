import { Router, Request } from "express";
import { requireSeller } from "../../middleware/requireSeller.js";

// services
import { queryDatabase, type AggregateCountObj, ProjectionParameters } from "../../services/DbAggregationPipeline.js";
import { findAndUpdate } from "../../services/updateDocument.js";
import { deleteByIds } from "../../services/updateDocument.js";
import { countDocuments } from "../../services/countDocuments.js";

// types
import type { TypedResponse } from "../../utils/types/utilTypes.js";
import type { tResponseError } from "../../types/routesInterface.js";

// utils
import { toObjectId } from "../../lib/mongoose.js";

const router = Router();

// Load Dashboard Data
router.post("/products", requireSeller, async (req: Request, res) => {
    const sellerId = req.user?.userId;
    const { currentShop } = req.body;
    const { limit, page } = req.body;
    console.log("currentShop", currentShop)

    if (!sellerId) {
        console.log("invalid seller id.")
        return res.status(400).json({ errorMsg: "Seller not found" });
    }

    const currentShopRef = currentShop ? { shopRef: toObjectId(currentShop) } : {};
    const match = { sellerId, ...currentShopRef };

    const countParameters: AggregateCountObj[] = [
        { fieldName: "totalProducts", match },
        { fieldName: "inStock", match: { ...match, stock: { $gt: 0 } } },
        { fieldName: "outOfStock", match: { ...match, stock: { $eq: 0 } } },
        { fieldName: "totalInventory", match, sumField: "stock" }
    ]

    const productsData: ProjectionParameters = {
        match,
        project: {
            _id: 1,
            images: 1,
            name: 1,
            description: 1,
            price: 1,
            stock: 1,
            category: 1,
            updatedAt: 1
        },
        sort: { updatedAt: -1 },
        skip: page,
        limit: limit
    }

    const productsByCategory: ProjectionParameters = {
        match,
        group: {
            _id: "$category",
            count: { $sum: 1 }
        },
        project: {
            _id: 0,
            category: "$_id",
            count: 1
        }
    }

    const dashboardProductsData = await queryDatabase("product", countParameters, { productsData, productsByCategory });

    if (dashboardProductsData.found) {
        const totalProducts = dashboardProductsData.docCount.totalProducts;
        
        await findAndUpdate("shop", { sellerId }, { productsCount: totalProducts });
    }
    return res.status(200).json(dashboardProductsData);

});

// Edit Product
router.put("/products/edit/", requireSeller, async (req: Request, res: TypedResponse<tResponseError | { message: string }>) => {
    const { id, name, description, price, stock, category } = req.body;
    const sellerId = req.user?.userId;

    if (!sellerId) {
        console.log("invalid seller id.")
        return res.status(400).json({ errorMsg: "Seller not found" });
    }

    const EditProduct = await findAndUpdate("product", { _id: id, sellerId }, { name, description, price, stock, category });

    if (!EditProduct.updated) {
        return res.status(400).json({ errorMsg: "Encounted an error editing product: " });
    }

    return res.status(200).json({ message: "Product edited successfully" })
})

// Delete Product by id.
router.post("/products/delete/", requireSeller, async (req: Request, res: TypedResponse<tResponseError | { message: string }>) => {
    const { ids } = req.body;
    const sellerId = req.user?.userId;

    if (!ids) {
        console.log("invalid ids.")
        return res.status(400).json({ errorMsg: "Ids not found" });
    }

    if (!sellerId) {
        console.log("invalid seller id.")
        return res.status(400).json({ errorMsg: "Seller not found" });
    }

    const deletedProducts = await deleteByIds("product", ids, { sellerId });

    if (!deletedProducts.deleted) {
        return res.status(400).json({ errorMsg: "Encounted an error deleting products: " });
    }

    const totalProducts = await countDocuments("product", { sellerId });
    console.log(totalProducts);
    await findAndUpdate("shop", { sellerId }, { productsCount: totalProducts });

    return res.status(200).json({ message: `${deletedProducts.deletedCount} Product${deletedProducts.deletedCount === 1 ? "" : "s"} deleted successfully` })
})


export default router;






