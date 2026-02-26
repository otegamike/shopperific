// Database services
import { deleteByIds } from "./database/updateDocument.js"; 

// services
import { removeFromShopProductCount } from "./updateShopProductCount.js";
import { deleteMultipleImages } from "../utils/CloudinaryHelpers.js";
// types
import type { shopList } from "../types/validationInterface.js"; 
import type { ProductType } from "../models/Product.js";

// utils
import { toObjectId } from "../lib/mongoose.js";

export interface DeleteProductObject {
    shop_id: string;
    productIds: string[];
}

export const deleteProductsFromShop = async ( 
    sellerId: string, 
    deleteProduct: DeleteProductObject):
    Promise<
        | { deleted: true, deletedCount: number, imagesToDelete: string[] }
        | { deleted: false, errorMsg: string }
    > => {
    const { shop_id, productIds } = deleteProduct;

    const deleteResult = await deleteByIds<ProductType>("product", productIds, { sellerId , shopRef: toObjectId(shop_id)}, true);
    if (!deleteResult.deleted) {
        return { deleted: false, errorMsg: deleteResult.errorMsg};
    } 

    const updateShopProductCount = await removeFromShopProductCount(shop_id, deleteResult.deletedCount);
    if (!updateShopProductCount.updated) {
        return { deleted: false, errorMsg: "Failed to update shop product count" };
    }

    const images = deleteResult.deletedData.flatMap((product: ProductType) => product.images ? product.images : []);
    
    return { deleted: true, deletedCount: deleteResult.deletedCount, imagesToDelete: images };

}