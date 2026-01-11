import { useState } from 'react';
import './hamburger-menu.css'
function HamburgerMenu() {
  const [menuExpanded, setMenuExpanded] = useState(false);


  const expandMenu = () => {
  const menu = document.getElementById('menu');
  const panelButton = document.getElementById('panel-button');

  if (!menu || !panelButton) return;

  if (!menuExpanded) {
    menu.classList.add('menu__expand');
    menu.classList.remove('is-hidden');

  } else {
    panelButton.style.zIndex = '120';
    menu.classList.remove('menu__expand');
    menu.classList.add('is-hidden');
  }

  setMenuExpanded(prev => !prev);
};


  return (
    <div className='menu__container active'>
      <div className='hamburger-menu' onClick={expandMenu}>
        <div className={`bar ${menuExpanded ? 'cross' : ''}`}></div>
        <div className={`bar ${menuExpanded ? 'cross' : ''}`}></div>
        <div className={`bar ${menuExpanded ? 'cross' : ''}`}></div>
      </div>
    </div>
  );
}

export default HamburgerMenu;