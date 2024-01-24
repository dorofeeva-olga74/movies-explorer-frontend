import React from 'react';
import Account from '../Account/Account.js';
import Menu from '../Menu/Menu.js';
import BurgenMenu from '../BurgerMenu/BurgerMenu.js';

function HeaderAuthorization() {
  return (
    <>
      <Menu />
      <Account />
      <BurgenMenu/>
    </>
  )
}

export default HeaderAuthorization;