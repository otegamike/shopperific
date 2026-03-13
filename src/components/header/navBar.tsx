import Panel from "../panels/Panel"
import NavBarContent from "../contents/navBar/NavBarContent"
import type { MenuPanelProps } from "./Header"


function NavBarPanel({ menuPanelProps }: { menuPanelProps: MenuPanelProps }) {
  const { isMenuOpen} = menuPanelProps;
  return (
    <Panel className={`nav__menu ${isMenuOpen ? "menu__expand" : "is-hidden"}`} id="menu" children={<NavBarContent />} />
  )
}

export default NavBarPanel