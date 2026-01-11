import { Link } from "react-router-dom"
import { useState } from "react"
import "./nav-content.css"

import Button from "../../buttons/button"
import ShopSvg from "../../../assets/svg/shops"
import CartSvg from "../../../assets/svg/cart"
import AboutSvg from "../../../assets/svg/about"
import ContactSvg from "../../../assets/svg/contact"
import UserSvg from "../../../assets/svg/user"

function NavBarContent() {
  const [userName, setUserName] = useState<string|null>(localStorage.getItem("name"));

  return (
    <ul className="panel__list">
      <div className="center__content panel__user" >
        {userName && <UserSvg size={70} fill="var(--secondary-color)" /> }
        {userName &&  <h4>{userName}</h4> }
      </div>
      
      
      <li><Link to="/auth"><Button type="main" className="full__btn" id="panel-button" content="Sign up" /></Link></li>
      <li><Link className="panel-item" to="/shops"><ShopSvg size={20} />Shops</Link></li>
      <li><Link className="panel-item" to="/products"><CartSvg size={20} />Products</Link></li>
      <li><Link className="panel-item" to="/about"><AboutSvg size={20} />About</Link></li>
      <li><Link className="panel-item" to="/contact"><ContactSvg size={20} />Contact Us</Link></li>
    </ul>
  )
}

export default NavBarContent