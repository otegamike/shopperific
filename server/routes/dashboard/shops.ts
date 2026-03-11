import { type Request, type Response, Router } from "express";
import { AppError } from "../../utils/appError.js";
import { catchAsync } from "../../middleware/errorHandler.js";
import { requireSeller } from "../../middleware/requireSeller.js";
import { getShopsData } from "../../services/shopServices.js";

const router = Router() ;

router.get('/shops', requireSeller, catchAsync(async (req: Request, res: Response) => {

   const user = req.user;
    if (!user) {
        throw new AppError("Unauthorized", 401, { validated: false });
    }

    const { userId } = user;
    const shopsData = await getShopsData(userId);
    const { dashboardShopData } = shopsData;
    res.status(200).json({dashboardShopData});

}))

export default router;