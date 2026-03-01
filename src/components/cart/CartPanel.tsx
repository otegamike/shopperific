import { motion } from 'framer-motion';
import { ExpandPanelComponent , type animationProps  } from '../panels/expandPanel/ExpandPanel';
import { CartItemList , ProceedToCheckout } from './cart-items/cartItemList';
import { useCartContext } from '../../hooks/useCartContext';
import BackButton from '../../assets/svg/backButton';


function CartPanel({ animationProps, toggleCart }: { animationProps: animationProps, toggleCart: (cartState?: boolean) => void }) {
  const cartContext = useCartContext();
  
  return (
    <motion.div className="cart__container" id="cart-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4}}>
        <ExpandPanelComponent animationProps={animationProps} layoutId="cart" style={PanelStyle}>
          <div className="cart__header" >
            <div style={{position: "absolute"}} onClick={ () => toggleCart(false)}><BackButton fill="black" size={25} strokeWidth={2} /></div>
            <div className="cart__header__title"> <h3>Cart</h3></div>
          </div>
          <div className='cart__block no-scrollbar'>
            <CartItemList cartItemsProps={cartContext} />
          </div>
          <ProceedToCheckout />
        </ExpandPanelComponent>
      </motion.div>
  )
}

export default CartPanel

const PanelStyle: React.CSSProperties = {
  display: "flex",
  top: "3dvh",
  backgroundColor: "var(--primary-color-50)",
  height: "calc(100dvh - 15dvh)",
  bottom: "none",
  border: "1px solid var(--panel-color-darkest-transparent)",
  flexDirection: "column",
  padding: "1rem",
}