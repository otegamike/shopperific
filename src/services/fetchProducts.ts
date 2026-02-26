//  Utils
import { alertObj } from "../utils/alerts/alert";
import { cacheData, getCachedData } from "../utils/cacheData";
// api
import api from "../api/client";
// types
import type { ProductDataType, ProductCategoriesDataType } from "../types/productInterface/productInterface";
import type { getProductFunction } from "../components/product/ProductList";

export const fetchProducts = async (page: number = 1, limit: number = 12): Promise<ProductDataType | { errorMsg: string }> => {
    try {
        const response = await api.post(`/products?page=${page}&limit=${limit}`)
        const products = response.data;
        cacheData(`products-${page}-${limit}`, products);
        return products;

    } catch (error: any) {
        const cachedProducts = getCachedData(`products-${page}-${limit}`);
        if (cachedProducts) {
            alertObj("couldn't connect to our servers. loading cached data", "warning")
            return cachedProducts;
        }
        alertObj("Failed to fetch products", "error");
        return { errorMsg: "Failed to fetch products" };
    }
}

export const fetchProduct = async (id: string): Promise<ProductDataType | { errorMsg: string }> => {
    try {
        const response = await api.post(`products/product/${id}`);
        const { data } = response;

        const product = data;
        cacheData(`product-${id}`, product);
        return product;

    } catch (error: any) {
        const cachedProduct = getCachedData(`product-${id}`);
        if (cachedProduct) {
            alertObj("couldn't connect to our servers. loading cached data" , "warning")
            return cachedProduct;
        }
        alertObj("Failed to fetch products", "error");
        return { errorMsg: "Failed to fetch products" };
    }
}

export const fetchProductsByCategory = async (category: string, page: number = 1, limit: number = 12): Promise<{products: ProductDataType[]} | { errorMsg: string }> => {
    try {
        const response = await api.post(`products/category/${category}?page=${page}&limit=${limit}`);
        const { data } = response;
        console.log("data", data);

        const products = data;
        cacheData(`product-${category}-${page}-${limit}`, products);
        console.log("product", products);
        return { products };

    } catch (error: any) {
        const cachedProduct = getCachedData(`product-${category}-${page}-${limit}`);
        if (cachedProduct) {
            alertObj("couldn't connect to our servers. loading cached data" , "warning")
            console.log("cachedProduct", cachedProduct);
            return cachedProduct;
        }
        alertObj("Failed to fetch products", "error");
        return { errorMsg: "Failed to fetch products" };
    }
}

export const fetchProductCategories = async (page: number = 1, limit: number = 12): Promise<ProductCategoriesDataType[] | { errorMsg: string }> => {
    try {
        const response = await api.post(`products/categories?page=${page}&limit=${limit}`);
        const { data } = response;
        console.log("data", data);

        const productCategories: ProductCategoriesDataType[] = data;
        cacheData(`product-categories`, productCategories);
        console.log("productCategories", productCategories);
        return productCategories;

    } catch (error: any) {
        const cachedProductCategories = getCachedData(`product-categories`);
        if (cachedProductCategories) {
            alertObj("couldn't connect to our servers. loading cached data" , "warning")
            console.log("cachedProductCategories", cachedProductCategories);
            return cachedProductCategories;
        }

        alertObj("Failed to fetch products categories", "error");
        return { errorMsg: "Failed to fetch products categories" };
    }
}

export type GetByShopId = {shopId: string};

export const fetchProductsByShopId: getProductFunction<GetByShopId> = async (getBy: GetByShopId, page: number = 1, limit: number = 12): Promise<{products: ProductDataType[] } | { errorMsg: string }> => {
    try {
        const response = await api.post(`products/shop/${getBy.shopId}?page=${page}&limit=${limit}`);
        const { data } = response;
        console.log("data", data);

        const products: ProductDataType[] = data;
        cacheData(`product-${getBy.shopId}-${page}-${limit}`, products);
        console.log("product", products);
        return { products };

    } catch (error: any) {
        const cachedProduct = getCachedData(`product-${getBy.shopId}-${page}-${limit}`);
        if (cachedProduct) {
            alertObj("couldn't connect to our servers. loading cached data" , "warning")
            console.log("cachedProduct", cachedProduct);
            return cachedProduct;
        }

        alertObj("Failed to fetch products", "error");
        return { errorMsg: "Failed to fetch products" };
    }
}