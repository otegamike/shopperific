import "./header.css"
import logo from "../../assets/logo/logo.png"
import { Link } from "react-router-dom"
import Button from "../buttons/button"

function Header() {
  return (
    <header className='main-header'> 
      <div className='header'> <Link to="/home">
          <div className='header__logo'>
              <img src={logo} alt="logo" />
              Shopperific</div></Link>
          <div className='header__nav'>
              <ul className="header__nav-list">
                  <li>Search</li>
                  <li><Link to="/auth"><Button content="Sign in" type="main" /></Link></li>
              </ul>
          </div>
      </div>
    </header>
  )
}

export default Header