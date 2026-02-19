export interface ShopDataType {
    _id: string;
    shopName: string;
    shopId: string;
    description: string;
    displayImageUrl: string;
    productsCount: number;
    salesCount: number;
}

export interface ShopListType {
    shop_id: string;
    shopName: string;
}