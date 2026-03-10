import { type Request, type Response, Router } from "express";
import { AppError } from "../../utils/appError.js";
import { catchAsync } from "../../middleware/errorHandler.js";
import { getUserShopsData } from "../../services/shopServices.js";
import { requireSeller } from "../../middleware/requireSeller.js";
import { formatPagination } from "../../utils/paginationHelper.js";
import { getOrdersAndStats } from "../../services/OrderServices.js";

const router = Router();

router.post('/orders', requireSeller, catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        throw new AppError("Unauthorized", 401, { validated: false });
    }

    const { userId } = user;
    const { page = 1, limit = 10, clientCurrentShop, status } = req.body;
    console.log(req.body);

    const currentShop: string = clientCurrentShop || "";

    const pagination = formatPagination(page, limit);

    // Fetch all shops for the user to ensure they only query their own shops
    const userShopsData = await getUserShopsData(userId);
    if (!userShopsData || userShopsData.length === 0) {
        return res.status(200).json({
            status: "success",
            data: {
                orders: [],
                totalPages: 0,
                currentPage: pagination.page,
                totalOrders: 0,
                stats: { pending: 0, shipped: 0, delivered: 0 }
            }
        });
    }

    const userShops = userShopsData.map((shop: any) => {
        return {
            shop_id: shop._id.toString(),
            shopId: shop.shopId,
            shopName: shop.shopName
        }
    });

    console.log(userShops);

    const clientShopList = userShops.map((shop: any) => {
        return {
            shop_id: shop.shopId,
            shopName: shop.shopName
        }
    });

    const currentShopId = userShops.find((shop) => shop.shopId === currentShop)?.shop_id;
    
    console.log(currentShopId);
    const {orderProducts: ordersData, stats: orderStats, clientPagination} = await getOrdersAndStats({shopId: currentShopId, userId, pagination, status});

    res.status(200).json({
        status: "success",
        ordersData: {
            orders: ordersData,
            orderStats,
            pagination: clientPagination,
            shopList: clientShopList
        }
    });
}));

export default router;
