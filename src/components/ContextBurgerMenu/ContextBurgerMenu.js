import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import IconAccount from "../../images/iconAccount.svg";

function ContextBurgerMenu({ isOpen, onClose }) {
  const location = useLocation();

  //Обработчик Escape
  useEffect(() => {
    function closeByEscape(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen, onClose]);

  return (
    <section className={`context-burger-menu ${isOpen ? 'context-burger-menu_opened' : ''}`}>
      <div className='context-burger-menu__container'>
        <button className='context-burger-menu__close-button' onClick={onClose}></button>
        <nav className='context-burger-menu__nav'>
          <NavLink to='/' className={`context-burger-menu__link ${location.pathname === '/' ? 'context-burger-menu__current' : ''}`}>Главная</NavLink>
          <NavLink to='/movies' className={`context-burger-menu__link ${location.pathname === '/movies' ? 'context-burger-menu__current' : ''}`}>Фильмы</NavLink>
          <NavLink to='/saved-movies' className={`context-burger-menu__link ${location.pathname === '/saved-movies' ? 'context-burger-menu__current' : ''}`}>Сохранённые фильмы</NavLink>
        </nav>
        <div className='context-burger-menu__account-button account context-burger-menu__account'>
          <NavLink to='/profile' className='account__title context-burger-menu__account'>Аккаунт
            <img className='account__icon context-burger-menu__icon context-burger-menu__account' src={IconAccount} alt='Логотип аккаунта' />
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default ContextBurgerMenu;
