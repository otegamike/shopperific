// react
import { useNavigate } from "react-router-dom";

import "./card.css"
import type { ProductDataType } from "../../types/productInterface/productInterface";

// svg
import CartCheck from "../../assets/svg/CartCheck";

// hooks
import { useCartContext } from "../../hooks/useCartContext";

// components
import { CartAddRemoveButtons } from "../cart/cart-items/cartItemList";

interface ProductCardProps {
    orientation?: string;
    className?: string;
    loading?: boolean;
    product?: ProductDataType;
}

function ProductCard({ orientation = "row", className, loading = true, product }: ProductCardProps) {
   
    const navigate = useNavigate();
    const goToProduct = () => {
        navigate(`/product/${product?._id}`);
    }

    const { addToCart, cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCartContext();
    const cartItem = cartItems.find((item) => item.productId === product?._id);

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

                {!loading && cartItem ? 
                    <CartAddRemoveButtons 
                        cartItem={cartItem} 
                        cartActions={{increaseQuantity, decreaseQuantity, removeFromCart, addToCart}} 
                        itemQuantity={cartItem.productQuantity} 
                    /> 
                    : 
                    <button className={`product__button ${loading ? "skeleton__loader" : ""}`} onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product!);
                        }}
                    >
                    {!loading && <CartCheck size={20} />}
                    </button>
                }
            </span>
        </div>
    )
}

export const ProductCardComponent: React.FC<{
    product?: ProductDataType,
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


