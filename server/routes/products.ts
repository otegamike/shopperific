import { Router } from "express";
import { requireSeller } from "../middleware/requireSeller.js";
import { upload } from "../middleware/upload.js";
import { uploadBuffer } from "../utils/uploadToCloudinary.js";
import { toObjectId } from "../lib/mongoose.js";
import Product from "../models/Product.js";
import { getProduct } from "../services/fetchFromDb.js";

const router = Router();

//Get all products 
router.post('/' , async (req , res) => {

  const fetchProduct = await getProduct("all",  Number(req.query.limit), Number(req.query.page));

  if (!fetchProduct.found) { return res.status(500).json({message: "error fetching products"}) }
 
  return res.status(200).json(fetchProduct.products);
})

// Get product by Id
router.post('/:id' , async (req , res) => {
  const id = req.params.id;

  const fetchProduct = await getProduct({_id: id}, Number(req.query.limit), Number(req.query.page));

  if (!fetchProduct.found) { return res.status(500).json({message: "error fetching products"}) }
 
  return res.status(200).json(fetchProduct.products);
});

// Get products by Categories

router.post('/category/:category' , async (req , res) => {
  const category = req.params.category;

  const fetchProduct = await getProduct({category}, Number(req.query.limit), Number(req.query.page));

  if (!fetchProduct.found) { return res.status(500).json({message: "error fetching products"}) }
 
  return res.status(200).json(fetchProduct.products);
});

// Save new product
router.post("/new", requireSeller, upload.array("images", 5), async (req, res) => {
    try {

      console.log("New product request received", req.body, req.files);
      // Parse product JSON
      if (!req.user?.shopOwnerId) {
        return res.status(400).json({ error: "Couldn't validate your ShopId" });
      }

      if (!req.body.Product) {
        return res.status(400).json({ error: "Product data missing" });
      }

      const productData = JSON.parse(req.body.Product);

      // Validate images
      const files = req.files as Express.Multer.File[];

      if (!files || files.length < 1) {
        return res.status(400).json({
          error: "At least 1 product images are required",
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
        shopName:"",
        shopRef: toObjectId(req.user.shopOwnerId),
      });

      await newProduct.save();

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