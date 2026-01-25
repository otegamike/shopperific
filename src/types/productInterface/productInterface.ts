export const PRODUCT_CATEGORIES = [
    "Electronics",
    "Fashion & Apparel",
    "Computers & Accessories",
    "Home & Kitchen",
    "Health & Wellness",
    "Automotive",
    "Beauty & Personal Care",
    "Sports & Outdoors",
    "Books & Media",
    "Toys & Games",
    "Food & Beverages",
    "Pet Supplies",
    "Other"
] as const;

export type Category = typeof PRODUCT_CATEGORIES[number] | "";

export interface NewProductDataType {
    name: string;
    description: string;
    price: number;
    sellerId: string;
    category: Category;
    subCategory: string;
    stock: number;
}

export interface ProductImageType {
    file: File;
    preview: string;
}


