import "./header.css"
import HeaderLogo from "./HeaderLogo"
import NavBarPanel from "./navBar"
import HeaderNav from "./HeaderNav"
import { Link } from "react-router-dom"
import Button from "../buttons/button"

interface HeaderProps {
  navbar?: boolean;
}

function Header({ navbar }: HeaderProps) {
  return (
    <header>  
      <div className='main-header'>
        <div className='header'> 
          <HeaderLogo />
          {navbar && <HeaderNav buttonid="nav-button" />}
        
        </div>
      </div>
      {navbar && <NavBarPanel />}
      
      {navbar && <Link to="/auth"><Button type="main" id="transmorph" className="pill__btn button__clone" content="Sign up" /></Link>}
    </header>
  )
}

export default Header