import type { ShopDataType } from "../../types/shopsInterface";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
    orientation?: string;
    className?: string;
    loading?: boolean;
    shopData: ShopDataType;
}

export function ShopsListCard({loading = true, shopData }: CategoryCardProps) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/products/category/${shopData.name}`);
    }

  return (
    <li className={`list__card`} onClick={handleNavigate}>
        <span className={`list__display__image ${loading ? "skeleton__loader" : ""}`}>
            <img src={shopData.displayImageUrl} alt={shopData.name} />
        </span>
        <span className="list__group">
            <span className={`list__title ${loading ? "skeleton__loader" : ""}`}>{shopData.name}</span>
            <span className={`list__info ${loading ? "skeleton__loader" : ""}`}>{shopData.productsCount} products</span>
        </span>
    </li>
  )
}

interface CategoriesProps {
    className?: string;
    loading?: boolean;
    productsCategoryData: ShopDataType[];
}

export default function Categories ({ className, loading = true, productsCategoryData }: CategoriesProps) {
    return (
        <ul className={`list__container ${className}`} tabIndex={1}>
            {productsCategoryData.map((productCategoryData) => (
                <ShopsListCard loading={loading} key={productCategoryData.name} shopData={productCategoryData} />
            ))}
        </ul>
    )
}


