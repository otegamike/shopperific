import type { Pagination } from "./paginationInterface";
import type { ShopListType } from "./shopsInterface";

export interface OrderDataInterface {
    _id: string;
    status: string;
    orderId: string;
    quantity: number;
    price: number;
    date: string;
    image: string[];
    productName: string;
}

export interface OrdersData {
    orders: OrderDataInterface[];
    orderStats: {pending: number, shipped: number, delivered: number, cancelled: number};
    pagination: Pagination;
    shopList: ShopListType[];
}