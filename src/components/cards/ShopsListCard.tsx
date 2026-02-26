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
        navigate(`/shops/shop/${shopData.shopId}`);
    }

  return (
    <li className={`list__card`} onClick={handleNavigate}>
        <span className={`list__display__image ${loading ? "skeleton__loader" : ""}`}>
            <img src={shopData.displayImageUrl} alt={shopData.shopName} />
        </span>
        <span className="list__group">
            <span className={`list__title ${loading ? "skeleton__loader" : ""}`}>{shopData.shopName}</span>
            <span className={`list__info ${loading ? "skeleton__loader" : ""}`}>{shopData.productsCount} products</span>
        </span>
    </li>
  )
}

interface ShopsListProps {
    className?: string;
    loading?: boolean;
    shopsData: ShopDataType[];
}

export default function ShopsList ({ className, loading = true, shopsData }: ShopsListProps) {
    return (
        <ul className={`list__container ${className}`} tabIndex={1}>
            {shopsData.map((shopData) => (
                <ShopsListCard loading={loading} key={shopData.shopName} shopData={shopData} />
            ))}
        </ul>
    )
}


