import "./nav-content.css"
import { Link } from "react-router-dom"

// utils
import { capitalize } from "../../../utils/capitalize"

// hooks
import { useAuth } from "../../../hooks/useAuth"

// components
import Button from "../../buttons/button"
import ShopSvg from "../../../assets/svg/shops"
import CartSvg from "../../../assets/svg/products"
import AboutSvg from "../../../assets/svg/about"
import ContactSvg from "../../../assets/svg/contact"
import UserSvg from "../../../assets/svg/user"

function NavBarContent() {
  const { user } = useAuth();
  const userName = user?.firstName;
  
  const ButtonPage = {
    signIn: "/auth",
    dashboard: "/dashboard"
  }

  return (
    <ul className="panel__list">
      <div className="center__content panel__user" >
        {userName && <UserSvg size={70} fill="var(--secondary-color)" />}
        {userName && <h4>{capitalize(userName)} | <span style={{color: "lightgreen"}}>{capitalize(user.role)}</span> </h4>} 
      </div>


      <li className="panel__button"><Link to={userName ? ButtonPage.dashboard : ButtonPage.signIn} ><Button type="main" className="full__btn" id="panel-button" content={userName ? "Dashboard" : "Sign up"} /></Link></li>
      <li><Link className="panel-item" to="/shops"><ShopSvg size={20} />Shops</Link></li>
      <li><Link className="panel-item" to="/products"><CartSvg size={20} />Products</Link></li>
      <li><Link className="panel-item" to="/about"><AboutSvg size={20} />About</Link></li>
      <li><Link className="panel-item" to="/contact"><ContactSvg size={20} />Contact Us</Link></li>
    </ul>
  )
}

export default NavBarContent