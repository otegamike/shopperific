import './cart-button.css'
import CartSvg from "../../../assets/svg/Cart"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion';

import { useCartContext } from '../../../hooks/useCartContext';

export interface CartButtonProps {
  toggleCart: (cartState?: boolean) => void;
  cartIsOpen: boolean;
}

function CartButton({ cartButtonProps }: { cartButtonProps: CartButtonProps }) {
    const { toggleCart, cartIsOpen } = cartButtonProps;
    const { cartItems } = useCartContext();
    const [count, setCount] = useState(cartItems.length || 0)

    useEffect(() => {
        setCount(cartItems.length)
    }, [cartItems])
    if (count > 99) {
        setCount(99)
    }
    return (
        <div className="cart" onClick={() => toggleCart()} id="cart-button">
            {!cartIsOpen && count > -1 && <motion.span className="count" layoutId="cart">{count}</motion.span>}
            <CartSvg  className="cartsvg" fill="var(--primary-color)" strokeWidth={1.8}/>
        </div>
    )
}

export default CartButton