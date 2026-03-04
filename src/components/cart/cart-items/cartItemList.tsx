import './cart-item.css'

// types
import { type CartItem } from '../../../types/CartInterface'
import { type CartContextType } from '../../../context/CartContext'

// components
import Button from '../../buttons/button';

// hooks
import { useCartContext } from '../../../hooks/useCartContext';

export function CartItem({cartItem}: {cartItem: CartItem}) {

    const { removeFromCart } = useCartContext();
  return (
    <li className="cart__item">
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
    </li>
  )
}


export function CartItemList({cartItemsProps}: {cartItemsProps: CartContextType}) {
    const { cart } = cartItemsProps;
    const cartItems = cart?.cartItems || [];

    return (
        <div className="cart__list__container">
            <ul className="cart__items">
                {cartItems.map((cartItem) => (
                    <CartItem key={cartItem.productId} cartItem={cartItem}/>
                ))}
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

    const { cart } = useCartContext();
    const totalPrice = cart?.totalPrice || 0;

    return (
        <div className="checkout__section">
            <div className="checkout__info">
                <div className="checkout__info__total">
                    <span className="checkout__info__total__label">Total</span>
                    <span className="checkout__info__total__value">${totalPrice}</span>
                </div>
            </div>
            <Button className='checkout__button tall' type='main' content="Proceed to Checkout" />
        </div>
    )
}