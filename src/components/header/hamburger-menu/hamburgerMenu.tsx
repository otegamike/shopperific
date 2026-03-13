import './hamburger-menu.css'
import { type MenuPanelProps } from '../Header';



interface HamburgerMenuProps {
  menuPanelProps: MenuPanelProps;
}

function HamburgerMenu({ menuPanelProps }: HamburgerMenuProps) {
  const { isMenuOpen, toggleMenu } = menuPanelProps;

  return (
    <div className='menu__container active'>
      <div className='hamburger-menu' onClick={() => toggleMenu()}>
        <div className={`bar ${isMenuOpen ? 'cross' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'cross' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'cross' : ''}`}></div>
      </div>
    </div>
  );
}

export default HamburgerMenu;