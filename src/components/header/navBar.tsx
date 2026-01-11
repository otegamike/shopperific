import Panel from "../panels/Panel"
import NavBarContent from "../contents/navBar/NavBarContent"



function NavBarPanel() {
  return (
    <Panel className="nav__menu is-hidden" id="menu" children={<NavBarContent />} />
  )
}

export default NavBarPanel