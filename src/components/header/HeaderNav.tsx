
import HamburgerMenu from "./hamburger-menu/hamburgerMenu"
import Button from "../buttons/button"
import Search from "../contents/search/Search"

interface HeaderNavProps {
  buttonid?: string;
}

function HeaderNav({ buttonid }: HeaderNavProps) {
  return (
    <div className='header__nav'>
      <Search />
      <Button type="main" id={buttonid} className="pill__btn is-hidden cta__anchor" content="Sign up" />
      <HamburgerMenu />
    </div>
  )
}

export default HeaderNav