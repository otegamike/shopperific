import { Router } from "express";
import Shop from "../models/Shop.js";
import { requireSeller } from "../middleware/requireSeller.js";
import { Response } from "express";

import { ShopReqBody } from "../models/Shop.js";
import { TypedRequest} from "../utils/types/utilTypes.js";
import { toObjectId } from "../lib/mongoose.js";
import { ShopSchema } from "../models/Shop.js";
import { getShop, getManyFromDB } from "../services/fetchFromDb.js";
import { upload } from "../middleware/upload.js";
import { uploadBuffer } from "../utils/uploadToCloudinary.js";


const router = Router();

////////////////// GET ALL SHOPS ////////////////////
router.post("/", async (req, res) => { 

    const { sellerId } = req.body;
    const findBy = sellerId? { sellerId} : {} ;

    const pagination = {
        limit: Number(req.query.limit),
        page: Number(req.query.page)
    }

    const options = {
        sort: { createdAt: -1 },
        lean: true
    }
     
    const fetchShop = await getManyFromDB("shop", { findBy, options, pagination });

    
    if (!fetchShop.found) { return res.status(500).json({message: "error fetching shops"}) }
    
    const shops = fetchShop.payload;
    return res.status(200).json(shops);
});

///////////////// GET SHOP BY SHOP ID ///////////////
router.get("/:shopId", async (req, res) => {
    const shopId = req.params.shopId;
    
    const fetchShop = await getShop({ shopId }, Number(req.query.limit), Number(req.query.page));
    
    if (!fetchShop.found) { return res.status(404).json({message: "Shop not found"}) }
     
    return res.status(200).json(fetchShop.shops);
});

///////////////// CHECK IF SHOP ID IS AVAILABLE //////////////
router.post("/shop-id", async (req, res) => {
    const shopId = req.body.shopId;
    console.log(shopId);

    try {
        const fetchShop = await getShop({ shopId }, Number(req.query.limit), Number(req.query.page));

        console.log(fetchShop);
    
        if (!fetchShop.found && !fetchShop.error) { return res.status(200).json({available: true, message: "Shop is available"}) }

        if (fetchShop.error) {throw new Error(fetchShop.error)}

        return res.status(200).json({available: false, message: "Shop id taken pick a different shopId"} );
        
    } catch (err: any) {
        console.error(err.message, err);

        return res.status(500).json({error: err.message});
    }
    
    
});

///////////////// CREATE NEW SHOP ////////////////
router.post("/new", upload.single("displayImage"),  async (req: TypedRequest<ShopReqBody>, res: Response ) => { 
    const { shopName , shopId , description } = req.body;

    console.log('creating new shop');
    if ( !req.user) {
        console.log("unAuthorized user");
        return res.status(403).json({message: "Unvalidated Access is Forbiden."});
    }

    const sellerId = req.user.userId;

    // Check if feilds are filled. 
    if ( !shopName || !shopId || !description ) {
        return res.status(403).json({message: "Shop name, unique Shop id and description are required."});
    }

    if (!req.file) {
        return res.status(403).json({message: "Display image is required."});
    }

    try {
        const displayImage: Express.Multer.File = req.file;

        const displayImageUrl = await uploadBuffer(displayImage.buffer, "Shop display image");

        // check if Shop ID is taken
        const [existingShop, totalShops] = await Promise.all([
            Shop.findOne({ shopId }).lean(), // lean() for better performance
            Shop.countDocuments()
        ]);

        if (existingShop) {
            console.log("Shop ID is taken");
            return res.status(403).json({message: `${shopId} is already taken. Try another one`});
        }

        const sellerIndex = totalShops;
        const userRef = toObjectId(req.user.userId) ;

        const shopObj: Partial<ShopSchema> = {
            shopName, shopId, description, displayImageUrl, sellerIndex, sellerId, userRef
        }

        const newShop = new Shop({
            ...shopObj
        })
        
        const createShop = await newShop.save();

        console.log("New Shop added to database.");
        return res.status(201).json({ message: `Your shop ${shopName} was created successfully.`});

    } catch (err: any) {
        console.error(err.message, err);
        return res.status(500).json({error: "Server Error. Try again"});

    }


});


export default router;