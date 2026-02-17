import type {  ProductCategoriesDataType } from "../../types/productInterface/productInterface";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
    orientation?: string;
    className?: string;
    loading?: boolean;
    productCategoryData: ProductCategoriesDataType;
}

export function CategoryCard({loading = true, productCategoryData }: CategoryCardProps) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/products/category/${productCategoryData.categoryName}`);
    }

  return (
    <li className={`list__card`} onClick={handleNavigate}>
        <span className={`list__display__image ${loading ? "skeleton__loader" : ""}`}>
            <img src={productCategoryData.displayImageUrl} alt={productCategoryData.categoryName} />
        </span>
        <span className="list__group">
            <span className={`list__title ${loading ? "skeleton__loader" : ""}`}>{productCategoryData.categoryName}</span>
            <span className={`list__info ${loading ? "skeleton__loader" : ""}`}>{productCategoryData.ProductCount} products</span>
        </span>
    </li>
  )
}

interface CategoriesProps {
    className?: string;
    loading?: boolean;
    productsCategoryData: ProductCategoriesDataType[];
}

export default function Categories ({ className, loading = true, productsCategoryData }: CategoriesProps) {
    return (
        <ul className={`list__container ${className}`} tabIndex={1}>
            {productsCategoryData.map((productCategoryData) => (
                <CategoryCard loading={loading} key={productCategoryData.categoryName} productCategoryData={productCategoryData} />
            ))}
        </ul>
    )
}


