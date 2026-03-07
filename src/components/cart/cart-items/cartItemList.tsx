import './cart-item.css'

// react
import { useState } from 'react';

// motion
import { motion, AnimatePresence } from 'framer-motion';

// types
import { type CartItem } from '../../../types/CartInterface'
import { type CartContextType } from '../../../context/CartContext'

// components
import Button from '../../buttons/button';
import NextArrow from '../../../assets/svg/NextArrow';

// hooks
import { useCartContext } from '../../../hooks/useCartContext';

// services
import { checkOut } from '../../../services/checkoutServices';

export function CartItem({cartItem}: {cartItem: CartItem}) {

    const { removeFromCart } = useCartContext();
  return (
    <motion.li className="cart__item" exit={{opacity: 0, height: "0.1px", x: '-110%'}} transition={{ duration: 0.4}}>
        <div className="cart__item__image">
            <button className="remove-item-button" onClick={() => removeFromCart(cartItem.productId)}>x</button>
            <img src={cartItem.productImage} alt={cartItem.productName} />
        </div>
        <div className="cart__item__info">
            <div className='cart__item__name'>{cartItem.productName}</div>
            <div className='cart__item__action'>
                <div className='cart__item__price'>
                    <div className='cart__price__info'>
                        {cartItem.productQuantity} x {cartItem.productPrice}
                    </div>
                    ${cartItem.productTotalPrice}
                    </div>
                <CartAddRemoveButtons productId={cartItem.productId} itemQuantity={cartItem.productQuantity} />
            </div>
        </div>
    </motion.li>
  )
}


export function CartItemList({cartItemsProps}: {cartItemsProps: CartContextType}) {
    const { cart } = cartItemsProps;
    const cartItems = cart?.cartItems || [];

    return (
        <div className="cart__list__container">
            <ul className="cart__items">
                <AnimatePresence>
                    {cartItems.map((cartItem) => (
                        <CartItem key={cartItem.productId} cartItem={cartItem}/>
                    ))}
                </AnimatePresence>
            </ul>
        </div>
    )
}

export function CartAddRemoveButtons({itemQuantity, productId}: {itemQuantity: number, productId: string}) {
    
    const { increaseQuantity, decreaseQuantity } = useCartContext();

    return (
        <div className="cart__action__buttons">
            <button className="cart__remove__button" onClick={(e) => {e.stopPropagation(); decreaseQuantity(productId)}}>-</button>
            <span className='cart__item__quantity'>{itemQuantity}</span>
            <button className="cart__add__button" onClick={(e) => {e.stopPropagation(); increaseQuantity(productId)}}>+</button>
        </div>
    )
}

export function ProceedToCheckout() {

    const { cart , clearCart } = useCartContext();
    const totalPrice = cart?.totalPrice || 0;
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        try { 
            setIsLoading(true);
            await checkOut();
            await clearCart();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    return (
        <div className="checkout__section">
            <div className="checkout__info">
                <div className="checkout__info__total">
                    <span className="checkout__info__total__label">Total</span>
                    <span className="checkout__info__total__value">${totalPrice}</span>
                </div>
            </div>
            <Button className='checkout__button tall center__content' type='main' isLoading={isLoading} onClick={handleCheckout}>
                <span style={{display: "flex", alignItems: "center", gap: "0.5rem" }}>
                     Proceed to Checkout <NextArrow fill="white" size={25} strokeWidth={1.8} />
                </span>
            </Button>
        </div>
    )
}