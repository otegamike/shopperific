export interface DashboardProductsDataStats {
    totalProducts: number;
    inStock: number;
    outOfStock: number;
    totalInventory: number;
}

export interface DashboardProductsData {
    name: string;
    images: string[];
    description: string;
    price: number;
    stock: number;
    category: string;
}

export const defaultTableColumns: (keyof DashboardProductsData)[] = ["images", "name", "description", "price", "stock", "category"];
export const mobileTableColumns: (keyof DashboardProductsData)[] = ["images", "name", "price", "stock", "category"];

export const emptyProductsDataStats: DashboardProductsDataStats = {
    totalProducts: 0,
    inStock: 0,
    outOfStock: 0,
    totalInventory: 0
}