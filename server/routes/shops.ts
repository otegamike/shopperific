import { Router } from "express";
import Shop from "../models/Shop.js";
import { requireSeller } from "../middleware/requireSeller.js";
import { Response } from "express";

import { ShopReqBody } from "../models/Shop.js";
import { TypedRequest} from "../utils/types/utilTypes.js";
import { toObjectId } from "../lib/mongoose.js";
import { ShopSchema } from "../models/Shop.js";
import { getShop } from "../services/fetchFromDb.js";

const router = Router();
// get all shops
router.get("/", async (req, res) => { 
     const fetchShop = await getShop("all",  Number(req.query.limit), Number(req.query.page));
    
      if (!fetchShop.found) { return res.status(500).json({message: "error fetching shops"}) }
     
      return res.status(200).json(fetchShop.shops);
});

// get shop by shop name
router.get("/:shopId", async (req, res) => {
    const shopId = req.params.shopId;
    
    const fetchShop = await getShop({ shopId }, Number(req.query.limit), Number(req.query.page));
    
    if (!fetchShop.found) { return res.status(500).json({message: "error fetching Shops"}) }
     
    return res.status(200).json(fetchShop.shops);
});

// create a new shop
router.post("/new", requireSeller, async (req: TypedRequest<ShopReqBody>, res: Response ) => { 
    const { shopName , shopId , description } = req.body;

    if ( !req.user) {
        return res.status(403).json({message: "Unvalidated Access is Forbiden."});
    }

    // Check if feilds are filled. 
    if ( !shopName || !shopId || !description ) {
        return res.status(403).json({message: "Shop name, unique Shop id and description are required."});
    }

    try {

        // check if Shop ID is taken
        const [existingShop, totalShops] = await Promise.all([
            Shop.findOne({ shopId }).lean(), // lean() for better performance
            Shop.countDocuments()
        ]);

        if (existingShop) {
            return res.status(403).json({message: `${shopId} is already taken. Try another one`});
        }

        const sellerId = totalShops;
        const owner = toObjectId(req.user.userId) ;

        const shopObj:ShopSchema = {
            shopName, shopId, description, sellerId, owner
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