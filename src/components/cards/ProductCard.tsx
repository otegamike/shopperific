

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
    return (
        <div className={`product__card ${orientation} ${className}`}>
            <span className={`product__image  ${loading ? "skeleton__loader" : ""}`}>
                {!loading && product?.images?.[0] && <img src={product.images[0]} alt={product.name} />}
            </span>
            <div className="product__info">
                <span className={`product__name ${loading ? "skeleton__loader" : ""}`}>
                    {!loading && product?.name}
                </span>
                <span className={`product__price ${loading ? "skeleton__loader" : ""}`}>
                        {!loading && `$${product?.price}`}
                </span>
            </div> <span className="product__actions"> 
            <button className={`product__button ${loading ? "skeleton__loader" : ""}`}>
                {!loading && <>Add to Cart <CartCheck size={20} /></>}
            </button></span>
                
            
        </div>
    )
}

export default ProductCard