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

export type Category = typeof PRODUCT_CATEGORIES[number] ;

export interface ClientProductDataType {
    name: string;
    description: string;
    price: number;
    category: Category;
    subCategory: string;
    stock: number;
}