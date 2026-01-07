import logo from "../../assets/logo/Shopperific-logo.png"
import { Link } from "react-router-dom"


function HeaderLogo() {
  return (
    <Link to="/home">
        <div className='header__logo'>
            <img src={logo} alt="logo" />
            Shopperific
        </div>
    </Link>
  )
}

export default HeaderLogo