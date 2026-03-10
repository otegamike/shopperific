import { type Request, type Response, Router } from "express";
import { AppError } from "../../utils/appError.js";
import { catchAsync } from "../../middleware/errorHandler.js";
import { getShopStats, getUserShopsData } from "../../services/shopServices.js";
import { requireSeller } from "../../middleware/requireSeller.js";
import Order from "../../models/Order.js";

const router = Router();

// Define a clean interface for the final response
interface ShopStats {
    orders: number;
    totalRevenue: number;
    visits: number;
    pendingOrders: number;
}

interface ShopOverview {
    shopId: string;
    shopName: string;
    shopStats: ShopStats;
}

router.post('/overview', requireSeller, catchAsync(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
        throw new AppError("Unauthorized", 401, { validated: false });
    }

    const { userId } = user;

    // 1. Fetch all shops belonging to this user
    const userShops = await getUserShopsData(userId);

    // If no shops exist, return early with an empty state
    if (!userShops || userShops.length === 0) {
        return res.status(200).json({
            status: "success",
            globalStats: { orders: 0, totalRevenue: 0, visits: 0, pendingOrders: 0 },
            shops: []
        });
    }

    // 2. Fetch stats for all shops in parallel
    const shopOverviewData: ShopOverview[] = await Promise.all(
        userShops.map(async (shop) => {
            const stats = await getShopStats(shop._id.toString());

            return {
                shopId: shop._id.toString(),
                shopName: shop.shopName,
                shopStats: {
                    orders: stats.Orders || 0,
                    totalRevenue: stats.totalRevenue || 0,
                    visits: stats.visits || 0,
                    pendingOrders: stats.pendingOrders || 0,
                }
            };
        })
    );

    // 3. Aggregate Global Stats using a Reducer
    const globalStats = shopOverviewData.reduce((acc, shop) => {
        acc.orders += shop.shopStats.orders;
        acc.totalRevenue += shop.shopStats.totalRevenue;
        acc.visits += shop.shopStats.visits;
        acc.pendingOrders += shop.shopStats.pendingOrders;
        return acc;
    }, {
        orders: 0,
        totalRevenue: 0,
        visits: 0,
        pendingOrders: 0
    });

    // Clean up floating point precision for the grand total
    globalStats.totalRevenue = Math.round(globalStats.totalRevenue * 100) / 100;

    // 4. Fetch recent orders
    const shopIds = userShops.map((shop: any) => shop._id);
    const recentOrdersDb = await Order.find({ shopRef: { $in: shopIds } })
        .sort({ createdAt: -1 })
        .limit(4)
        .populate({
            path: 'orderitems.productId',
            select: 'name images price'
        })
        .lean();

    const recentOrders = recentOrdersDb.map((order: any) => {
        // use the first item in the order for display
        const firstItem = order.orderitems?.[0]?.productId;
        return {
            orderNumber: order.orderUniqueId,
            price: `$${order.totalAmount.toFixed(2)}`,
            name: firstItem?.name || 'Unknown Product',
            img: firstItem?.images?.[0] || '',
        };
    });

    // 5. Final Production Response
    res.status(200).json({
        status: "success",
        data: {
            globalStats,         // Hero section data
            shops: shopOverviewData, // Table/List section data
            recentOrders
        }
    });
}));

export default router;