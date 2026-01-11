
import HamburgerMenu from "./hamburger-menu/hamburgerMenu"
import Search from "../contents/search/Search"
import UserSvg from "../../assets/svg/user"
import { Link } from "react-router-dom"

interface HeaderNavProps {
  buttonid?: string;
}

function HeaderNav({ buttonid }: HeaderNavProps) {
  return (
    <div className='header__nav'>
      <Search />
    <Link to="/profile"><UserSvg id={buttonid} className="usersvg" /></Link>
      <HamburgerMenu />
    </div>
  )
}

export default HeaderNav