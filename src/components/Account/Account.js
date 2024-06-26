import React from 'react';
import { NavLink } from 'react-router-dom';
import IconAccount from '../../images/iconAccount.svg';

function Account() {
  return (
    <div className='account'>
      <NavLink
        to='/profile'
        className='account__title'>
        Аккаунт
        <img
          className='account__icon'
          src={IconAccount}
          alt='Логотип аккаунта'
        />
      </NavLink>
    </div>
  );
}

export default Account;
