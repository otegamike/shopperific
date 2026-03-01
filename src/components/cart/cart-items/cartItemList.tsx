import './cart-item.css'
import { type CartItem } from '../../../types/CartInterface'
import { type CartContextType } from '../../../context/CartContext'
import Button from '../../buttons/button';


export function CartItem({cartItem, cartActions}: {cartItem: CartItem, cartActions: CartActionFunctions}) {

    const { removeFromCart } = cartActions;
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
                <CartAddRemoveButtons cartItem={cartItem} cartActions={cartActions} itemQuantity={cartItem.productQuantity} />
            </div>
        </div>
    </li>
  )
}

type CartActionFunctions = Omit<CartContextType, 'cartItems'>

export function CartItemList({cartItemsProps}: {cartItemsProps: CartContextType}) {
    const { cartItems, ...cartActions } = cartItemsProps;

    return (
        <div className="cart__list__container">
            <ul className="cart__items">
                {cartItems.map((cartItem) => (
                    <CartItem key={cartItem.productId} cartItem={cartItem} cartActions={cartActions} />
                ))}
            </ul>
        </div>
    )
}

export function CartAddRemoveButtons({itemQuantity, cartActions, cartItem}: {itemQuantity: number, cartActions: CartActionFunctions, cartItem: CartItem}) {
    const { increaseQuantity, decreaseQuantity } = cartActions;

    return (
        <div className="cart__action__buttons">
            <button className="cart__remove__button" onClick={(e) => {e.stopPropagation(); decreaseQuantity(cartItem.productId)}}>-</button>
            <span className='cart__item__quantity'>{itemQuantity}</span>
            <button className="cart__add__button" onClick={(e) => {e.stopPropagation(); increaseQuantity(cartItem.productId)}}>+</button>
        </div>
    )
}

export function ProceedToCheckout() {
    return (
        <div className="checkout__section">
            <div className="checkout__info">
                <div className="checkout__info__total">
                    <span className="checkout__info__total__label">Total</span>
                    <span className="checkout__info__total__value">$100</span>
                </div>
            </div>
            <Button className='checkout__button tall' type='main' content="Proceed to Checkout" />
        </div>
    )
}