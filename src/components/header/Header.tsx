import "./header.css"
import HeaderLogo from "./HeaderLogo"
import NavBarPanel from "./navBar"
import HeaderNav from "./HeaderNav"
import { useState } from "react"
import { type CartButtonProps } from "../cart/cart-button/CartButton"
import CartPanel from "../cart/CartPanel"

import { AnimatePresence } from "framer-motion"

interface HeaderProps {
  navbar?: boolean;
}



function Header({ navbar }: HeaderProps) {

  const [ cartIsOpen, setCartIsOpen ] = useState<boolean>(false);
  const [CartIsMounted, setCartIsMounted] = useState(false);
  
  const toggleCart = (cartState?: boolean) => {
    setCartIsOpen(prevState => cartState !== undefined ? cartState : !prevState);
  }

  const cartButtonProps: CartButtonProps = {
    toggleCart,
    cartIsOpen
  }


  const handleCartOpenComplete = () => {
    setCartIsMounted(true);
  }

  const cartAnimationProps = {
    isMounted: CartIsMounted,
    handleAnimationComplete: handleCartOpenComplete,
    duration: 0.4
  }



  return (
    <>
      <header>  
        <div className='main-header'>
          <div className='header'> 
            <HeaderLogo />
            {navbar && <HeaderNav cartButtonProps={cartButtonProps} buttonid="nav-button" />}
          
          </div>
        </div>
        {navbar && <NavBarPanel />}
      </header>

      <AnimatePresence>
        {cartIsOpen && 
          <CartPanel toggleCart={toggleCart} animationProps={cartAnimationProps} />
        }
      </AnimatePresence>


    </>
  )
}

export default Header