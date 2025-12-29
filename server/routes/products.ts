import { Router } from "express";
import { connectToDb } from "../middleware/connectToDb";
import { validateUser } from "../middleware/validateUser";
import { requireSeller } from "../middleware/requireSeller.js";
import { upload } from "../middleware/upload.js";
import { uploadBuffer } from "../utils/uploadToCloudinary.js";
import Product from "../models/Product.js";

const router = Router();

router.post(
  "/new",
  connectToDb,
  validateUser,
  requireSeller,
  upload.array("images", 5), 
  async (req, res) => {
    try {

      console.log("New product request received", req.body, req.files);
      // Parse product JSON
      if (!req.body.Product) {
        return res.status(400).json({ error: "Product data missing" });
      }

      const productData = JSON.parse(req.body.Product);

      // Validate images
      const files = req.files as Express.Multer.File[];

      if (!files || files.length < 3) {
        return res.status(400).json({
          error: "At least 3 product images are required",
        });
      }

      // Upload images to Cloudinary
      const imageUrls = await Promise.all(
        files.map((file) => uploadBuffer(file.buffer, "products"))
      );

      // Create product
      const newProduct = new Product({
        ...productData,
        images: imageUrls,
      });

      await newProduct.save();

      // Refresh access token (if issued)
      if (req.user?.accessToken) {
        res.setHeader(
          "Authorization",
          `Bearer ${req.user.accessToken}`
        );
      }

      res.status(201).json({
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (err) {
      console.error("Create product error:", err);
      res.status(500).json({ error: "Product creation failed" });
    }
  }
);

export default router;
















// import e, { Router } from "express";
// import { connectToDb } from "../middleware/connectToDb";
// import { validateUser } from "../middleware/validateUser";
// import type { TypedRequest, TypedResponse } from "../utils/types/utilTypes.js";
// import Product, { ProductType } from "../models/Product.js";
// import { requireSeller } from "../middleware/requireSeller.js";

// type NewProductRequestBody = {
//     Product: ProductType;
// }

// const router = Router();

// // New product route
// router.post("/new", connectToDb, validateUser, requireSeller, (req: TypedRequest<NewProductRequestBody>, res: TypedResponse<{ message: string, requestUser?: any }>) => {
 
//     const newProduct = new Product(req.body.Product);
//     newProduct.save();

//     console.log("New product request received:", newProduct);


//     // Set new access token in header if issued
//     if (req.user?.accessToken) res.setHeader("Authorization", `Bearer ${req.user.accessToken}`);

//     res.status(201).json({ message: "Product created successfully." , requestUser: req.user});
// });

// export default router;