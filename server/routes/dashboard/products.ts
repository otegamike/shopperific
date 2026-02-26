import { Router, Request } from "express";
import { requireSeller } from "../../middleware/requireSeller.js";
import Product, { type ProductType } from "../../models/Product.js";
// services
import { queryDatabase, type AggregateCountObj, ProjectionParameters } from "../../services/database/DbAggregationPipeline.js";
import { findAndUpdate } from "../../services/database/updateDocument.js";
import { deleteProductsFromShop, type DeleteProductObject } from "../../services/deleteProductsFromShop.js";

// types
import type { TypedResponse } from "../../utils/types/utilTypes.js";
import type { tResponseError } from "../../types/routesInterface.js";

// utils
import { toObjectId } from "../../lib/mongoose.js";
import { upload } from "../../middleware/upload.js";
import { uploadBuffer, deleteImageByUrl, deleteMultipleImages } from "../../utils/CloudinaryHelpers.js";


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
router.put("/products/edit/:id", upload.array("images", 4), requireSeller, async (req: Request, res: TypedResponse<tResponseError | { message: string }>) => {
    const { currentShop, imageToDelete, ...productData } = req.body;
    const sellerId = req.user?.userId;
    const productId = req.params.id;
    const shopRef = req.user?.shopRef;
    const shopId = req.user?.shopId;
    const shopName = req.user?.shopName;

    if (!sellerId || !productId || !shopRef || !shopId || !shopName) {
        console.log("invalid seller id or product id.")
        return res.status(400).json({ errorMsg: "Seller or product id not found" });
    }

    const files = req.files as Express.Multer.File[];
    let imageUrls: string[] = [];

    if (files && files.length > 0) {
        // Upload images to Cloudinary
        imageUrls = await Promise.all(
            files.map((file) => uploadBuffer(file.buffer, "products"))
        );
    }

    const imagesToDelete = imageToDelete ? JSON.parse(imageToDelete) : [];

    const product = await Product.findById(productId);

    if (!product) {
        return res.status(400).json({ errorMsg: "Product not found" });
    }

    product.set(productData);

    product.images = product.images.filter((img: string) => !imagesToDelete?.includes(img));
    product.images.push(...imageUrls);
    product.shopRef = toObjectId(shopRef);
    product.shopId = shopId;
    product.shopName = shopName;


    const updatedProduct = await product.save();

    if (!updatedProduct) {
        return res.status(400).json({ errorMsg: "Encounted an error editing product: " });
    }

    if (imageToDelete.length > 0) {
        imagesToDelete.forEach(async (image: string) => await deleteImageByUrl(image));
    }

    return res.status(200).json({ message: "Product edited successfully" })
})


// Delete Product by id.
router.post("/products/delete/", requireSeller, async (req: Request, res: TypedResponse<tResponseError | { message: string, deletedCount: number }>) => {
    const { deleteObject } = req.body as { deleteObject: DeleteProductObject[] };
    const sellerId = req.user?.userId;
    const shopRef = req.user?.shopRef;
    const shopList = req.user?.shopList;

    console.log("deleteObject", deleteObject);
    console.log("sellerId", sellerId);
    console.log("shopRef", shopRef);
    console.log("shopList", shopList);

    // Validation
    if (!deleteObject || !Array.isArray(deleteObject)) {
        return res.status(400).json({ errorMsg: "Invalid deleteObject format." });
    }

    if (!sellerId || !shopList ) {
        return res.status(401).json({ errorMsg: "Seller authentication missing." });
    }

    //Execute deletions
    const results = await Promise.all(
        deleteObject.map(async (deleteObject) => {

            //  Ensure the user only deletes from their own shop
            if (!shopList?.some((shop: any) => shop._id === deleteObject.shop_id)) {
                return { deleted: false, errorMsg: "Unauthorized shop access" };
            }

            return await deleteProductsFromShop(sellerId, deleteObject);
        })
    );

    // Check for partial failures
    if (results.some(r => r.deleted === false)) {
        console.log(results);
        return res.status(400).json({ errorMsg: "Encountered an error deleting some products." });
    }

    let deletedCount = 0;

    // Check for complete success
    if (results.every(r => r.deleted === true)) {
        const imagesToDelete = results.flatMap((result) => ("errorMsg" in result)? [] :result.imagesToDelete)
        deletedCount = results.reduce((total, result) => total + ("deletedCount" in result ? result.deletedCount : 0), 0);
        await deleteMultipleImages(imagesToDelete);
    }
    
    return res.status(200).json({ message: "Products deleted successfully", deletedCount });
});

export default router;






