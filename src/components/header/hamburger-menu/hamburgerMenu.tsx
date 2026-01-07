import { useState } from 'react';
import './hamburger-menu.css'

function HamburgerMenu() {
  const [menuExpanded, setMenuExpanded] = useState(false);


  const expandMenu = () => {
    setMenuExpanded(prev => !prev);
    const menu = document.getElementById('menu');
    const navButton = document.getElementById('nav-button');
    const panelButton = document.getElementById('panel-button');
    const transmorpher = document.getElementById("transmorph");

   

    console.log(menu);
    console.log(navButton);
    console.log(panelButton);

    if (menu && navButton && panelButton && transmorpher) {
       const panelWidth = panelButton.clientWidth

       transmorpher.style.maxWidth = `${panelButton.clientWidth}px`;
       transmorpher.style.width = `${navButton.clientWidth}px`;

      if (!menuExpanded) {
        menu.classList.add('menu__expand');
        navButton.classList.remove('cta__anchor');

        panelButton.classList.add('cta__anchor');

        transmorpher.classList.remove('pill__btn');
        requestAnimationFrame(()=>{
         transmorpher.style.width = `${panelWidth}px`;
         console.log(transmorpher);
        })
        // transmorpher.classList.add('full__btn');

      } else {
        menu.classList.remove('menu__expand');
        panelButton.classList.remove('cta__anchor');
        navButton.classList.add('cta__anchor');

        transmorpher.classList.remove('full__btn');
        transmorpher.classList.add('pill__btn');


      }
    }

  }

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