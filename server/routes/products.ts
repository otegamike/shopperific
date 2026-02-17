import { Router } from "express";
import { requireSeller } from "../middleware/requireSeller.js";
import { upload } from "../middleware/upload.js";
import { uploadBuffer } from "../utils/uploadToCloudinary.js";
import { toObjectId } from "../lib/mongoose.js";
import Product from "../models/Product.js";
import { getProduct } from "../services/fetchFromDb.js";
import { findOneFromDB , getManyFromDB } from "../services/fetchFromDb.js";
import { aggregateCount , type ProjectionParameters } from "../services/DbAggregationPipeline.js";
import { group } from "console";


const router = Router();

//Get all products 
router.post('/', async (req, res) => {

  const pagination = {
    limit: Number(req.query.limit),
    page: Number(req.query.page) 
  }

  const options = {
    sort: {createdAt: -1},
    lean: true
  }

  const fetchProduct = await getManyFromDB("product", {options, pagination});

  if (!fetchProduct.found) { return res.status(500).json({ error: "error fetching products" }) }

  const products = fetchProduct.payload;
  return res.status(200).json(products);
})

// Get product categories

router.post('/categories', async (req, res) => {
  const categories: ProjectionParameters = {
    group: {
      _id: "$category",
      count: { $sum: 1 },
      firstProduct: { $first: '$$ROOT' }
    },
    sort: { _id: 1 },
    limit: Number(req.query.limit),
    skip: (Number(req.query.page) - 1) * Number(req.query.limit)
  }

  const fetchCategories = await aggregateCount("product", [], {categories});

  if (!fetchCategories.found) { return res.status(500).json({ errorMsg: "error fetching products categories" }) }

  const productCategories  = fetchCategories.categories;

  // const productCategoriesKeys: string[] = [ "categoryName", "ProductCount", "displayImageUrl" ];
  const productCategoriesData = productCategories.map((category: any) => {
    return {
      categoryName: category._id,
      ProductCount: category.count,
      displayImageUrl: category.firstProduct.images[0]
    }
  })

  console.log("productCategories", productCategoriesData);
  return res.status(200).json(productCategoriesData);
})

router.post('/category/:category', async (req, res) => {
  const category = req.params.category;

  const fetchProduct = await getProduct({ category }, Number(req.query.limit), Number(req.query.page));

  if (!fetchProduct.found) { return res.status(500).json({ message: "error fetching products" }) }

  return res.status(200).json(fetchProduct.products);
});

// Get product by id
router.post('/product/:id', async (req, res) => {
  const id = req.params.id;

  const fetchProduct = await findOneFromDB("product", { _id: id });

  if (!fetchProduct.found) { return res.status(500).json({ message: "error fetching products" }) }
  const product = fetchProduct.payload;
  return res.status(200).json(product);
});

// Save new product
router.post("/new", requireSeller, upload.array("images", 4), async (req, res) => {
  try {
    console.log("New product request received", req.body);

    if (!req.user?.shopOwnerId) {
      return res.status(400).json({ error: "Couldn't validate your ShopId" });
    }

    // Validate images
    const files = req.files as Express.Multer.File[];

    if (!files || files.length < 1) {
      return res.status(400).json({
        error: "At least 1 product image is required",
      });
    }

    // Upload images to Cloudinary
    const imageUrls = await Promise.all(
      files.map((file) => uploadBuffer(file.buffer, "products"))
    );

    // Create product
    const newProduct = new Product({
      ...req.body,
      images: imageUrls,
      shopName: req.user.shopName,
      shopId: req.user.shopOwnerId,
      shopRef: toObjectId(req.user.shopOwnerId),
      sellerId: req.user.userId
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
});

export default router;