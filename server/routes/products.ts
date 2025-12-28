import e, { Router } from "express";
import { connectToDb } from "../middleware/connectToDb";
import { validateUser } from "../middleware/validateUser";
import type { TypedRequest, TypedResponse } from "../utils/types/utilTypes.js";
import Product, { ProductType } from "../models/Product.js";

type NewProductRequestBody = {
    Product: ProductType;
}

const router = Router();

// New product route
router.post("/new", connectToDb, validateUser, (req: TypedRequest<NewProductRequestBody>, res: TypedResponse<{ message: string, requestUser?: any }>) => {
 
    const newProduct = new Product(req.body.Product);
    newProduct.save();

    console.log("New product request received:", req.body.Product, newProduct);

    res.status(201).json({ message: "Product created successfully." , requestUser: req.user});
});

export default router;