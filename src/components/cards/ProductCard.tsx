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

function ProductCard({ orientation = "row", className, product }: ProductCardProps) {
   
    const navigate = useNavigate();
    const goToProduct = () => {
        navigate(`/product/${product?._id}`);
    }

    const { addToCart, cart } = useCartContext();
    const cartItems = cart?.cartItems || [];
    const cartItem = cartItems.find((item) => item.productId === product?._id);

    return (
        <div onClick={goToProduct} className={`product__card  ${orientation} ${className}`} >
            <span className={`product__image`}>
                {product?.images?.[0] && <img src={product.images[0]} alt={product.name} />}
            </span>
            <div className="product__info">
                <span className={`product__name`}>
                    {product?.name}
                </span>
            </div> 
            <span className="product__actions">
                <span className={`product__price`}>
                    {`$${product?.price}`}
                </span>

                {cartItem ? 
                    <CartAddRemoveButtons 
                        itemQuantity={cartItem.productQuantity} 
                        productId={cartItem.productId}
                    /> 
                    : 
                    <button className={`product__button`} onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product!);
                        }}
                    >
                    <CartCheck size={20} />
                    </button>
                }
            </span>
        </div>
    )
}

function LoadingProductCard({ orientation = "row", className }: ProductCardProps) {

    return (
        <div className={`product__card loading  ${orientation} ${className}`} >
            <span className='product__image loading'>
            </span>
            <div className="product__info">
                <span className='product__name skeleton__loader'>
                </span>
            </div> 
            <span className="product__actions">
                <span className='product__price skeleton__loader'>
                </span>
                <button className="product__button skeleton__loader" ></button>
            </span>
        </div>
    )
}

export const ProductCardComponent: React.FC<{
    product?: ProductDataType,
    last?: boolean,
    orientation?: "row" | "grid",
    loading?: boolean
}> = ({ product, orientation = "grid", loading = true}) => {
    if (loading) return (
        <LoadingProductCard
            orientation={orientation}
            loading={loading}
            product={product}
            key={product?._id}
        />
    ) 
    else return (
        <ProductCard
            orientation={orientation}
            loading={loading}
            product={product}
            key={product?._id}
        />
    )
}

export default ProductCard


