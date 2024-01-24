import React from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo.js';
import HeaderAuthMenu from '../HeaderAuthMenu/HeaderAuthMenu.js';
import HeaderAuthorization from '../HeaderAuthorization/HeaderAuthorization.js';

function Header({ isLoggedIn }) {
  const location = useLocation();

  return (
    <>     
      <header className={`header ${location.pathname !== "/" ? 'headerDark' : ''}`}>     
        <Logo />
        {isLoggedIn && <HeaderAuthMenu />}
        {!isLoggedIn && <HeaderAuthorization />}
      </header>
    </>
  )
}

export default Header;