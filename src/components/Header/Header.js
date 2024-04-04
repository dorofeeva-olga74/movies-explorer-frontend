import React from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo.js';
import HeaderAuthMenu from '../HeaderAuthMenu/HeaderAuthMenu.js';
import HeaderAuthorization from '../HeaderAuthorization/HeaderAuthorization.js';

function Header({ isLoggedIn, onCloseOverlay, isOpen, setIsContextBurgerMenuOpened, onClose }) {
  const location = useLocation();

  return (
    <>
      <header className={`header ${location.pathname !== '/' ? 'header-dark' : ''}`}>
        <Logo />
        {!isLoggedIn && <HeaderAuthMenu />}
        {isLoggedIn && (
          <HeaderAuthorization
            onCloseOverlay={onCloseOverlay}
            isOpen={isOpen}
            setIsContextBurgerMenuOpened={setIsContextBurgerMenuOpened}
            onClose={onClose}
          />
        )}
      </header>
    </>
  );
}

export default Header;
