import { Link } from "react-router-dom"
import Button from "../../buttons/button"

function NavBarContent() {
  return (
    <ul className="panel__list">
      <li><Link className="panel-item" to="/shops">Shops</Link></li>
      <li><Link className="panel-item" to="/products">Products</Link></li>
      <li><Link className="panel-item" to="/about">About</Link></li>
      <li><Link className="panel-item" to="/contact">Contact</Link></li>
      <li><Button type="main" className="full__btn is-hidden" id="panel-button" content="Sign up" /></li>
    </ul>
  )
}

export default NavBarContent