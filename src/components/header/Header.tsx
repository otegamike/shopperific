import "./header.css"
import HeaderLogo from "./HeaderLogo"
import NavBarPanel from "./navBar"
import HeaderNav from "./HeaderNav"

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
    </header>
  )
}

export default Header