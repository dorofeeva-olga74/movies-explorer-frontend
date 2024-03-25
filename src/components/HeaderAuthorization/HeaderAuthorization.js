import React from 'react';
import Account from '../Account/Account.js';
import Menu from '../Menu/Menu.js';
import BurgenMenu from '../BurgerMenu/BurgerMenu.js';

function HeaderAuthorization({ onCloseOverlay, isOpen, setIsContextBurgerMenuOpened, onClose }) {
  return (
    <>
      <Menu />
      <Account />
      <BurgenMenu
        onCloseOverlay={onCloseOverlay}
        isOpen={isOpen}
        setIsContextBurgerMenuOpened={setIsContextBurgerMenuOpened}
        onClose={onClose}
      />
    </>
  );
}

export default HeaderAuthorization;
