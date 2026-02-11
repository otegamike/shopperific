// react
import { useNavigate } from "react-router-dom";

import "./card.css"
import type { ProductType } from "../../types/productInterface/productInterface";

// svg
import CartCheck from "../../assets/svg/CartCheck";

interface ProductCardProps {
    orientation?: string;
    className?: string;
    loading?: boolean;
    product?: ProductType;
}

function ProductCard({ orientation = "row", className, loading = true, product }: ProductCardProps) {
   
    const navigate = useNavigate();
    const goToProduct = () => {
        navigate(`/product/${product?._id}`);
    }

    return (
        <div onClick={goToProduct} className={`product__card  ${loading ? "loading" : ""} ${orientation} ${className}`} >
            <span className={`product__image  ${loading ? "skeleton__loader" : ""}`}>
                {!loading && product?.images?.[0] && <img src={product.images[0]} alt={product.name} />}
            </span>
            <div className="product__info">
                <span className={`product__name ${loading ? "skeleton__loader" : ""}`}>
                    {!loading && product?.name}
                </span>
            </div> 
            <span className="product__actions">
                <span className={`product__price ${loading ? "skeleton__loader" : ""}`}>
                    {!loading && `$${product?.price}`}
                </span>

                <button className={`product__button ${loading ? "skeleton__loader" : ""}`}>
                    {!loading && <CartCheck size={20} />}
                </button>
            </span>
        </div>
    )
}

export const ProductCardComponent: React.FC<{
    product?: ProductType,
    last?: boolean,
    orientation?: "row" | "grid",
    loading?: boolean
}> = ({ product, orientation = "grid", loading = false }) => {
    return (
        <ProductCard
            orientation={orientation}
            loading={loading}
            product={product}
            key={product?._id}
        />
    )
}

export default ProductCard


