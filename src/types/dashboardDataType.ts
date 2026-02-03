export interface DashboardProductsDataStats {
    totalProducts: number;
    inStock: number;
    outOfStock: number;
    totalInventory: number;
}

export interface DashboardProductsData {
    productName: string;
    productImage: string;
    productDescription: string;
    productPrice: number;
    productStock: number;
    productCategory: string;
}

