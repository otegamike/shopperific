
import HamburgerMenu from "./hamburger-menu/hamburgerMenu"
import Search from "../contents/search/Search"
import UserSvg from "../../assets/svg/user"
import CartButton from "../cart/cart-button/CartButton"
import { Link } from "react-router-dom"
import { type CartButtonProps } from "../cart/cart-button/CartButton"

interface HeaderNavProps {
  buttonid?: string;
  cartButtonProps: CartButtonProps;
}

function HeaderNav({ buttonid, cartButtonProps }: HeaderNavProps) {
  return (
    <div className='header__nav'>
      <div className="search"><Search dynamic={true}/></div>
    <Link to="/profile"><UserSvg id={buttonid} className="usersvg" /></Link>
    <CartButton cartButtonProps={cartButtonProps} />
    <HamburgerMenu />
    </div>
  )
}

export default HeaderNav