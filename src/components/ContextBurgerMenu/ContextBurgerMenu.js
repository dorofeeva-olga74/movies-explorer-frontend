import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import IconAccount from "../../images/iconAccount.svg";

function ContextBurgerMenu({ isOpen, onClose }) {

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
    <section className={`contextBurgerMenu ${isOpen ? 'contextBurgerMenu_opened' : ''}`}>
      <div className='contextBurgerMenu__container'>
        <button className='contextBurgerMenu__close-button' onClick={onClose}></button>
        <nav className='contextBurgerMenu__nav'>
          <NavLink to='/' className='contextBurgerMenu__link contextBurgerMenu__current'>Главная</NavLink>
          <NavLink to='/movies' className='contextBurgerMenu__link contextBurgerMenu__current'>Фильмы</NavLink>
          <NavLink to='/saved-movies' className='contextBurgerMenu__link contextBurgerMenu__current'>Сохранённые фильмы</NavLink>
        </nav>

      </div>
      <button className='contextBurgerMenu__account-button account contextBurgerMenu__account'>
        <NavLink to='/profile' className='account__title contextBurgerMenu__account'>Аккаунт
          <img className='account__icon contextBurgerMenu__icon contextBurgerMenu__account' src={IconAccount} alt='Логотип аккаунта' />
        </NavLink>
      </button>
    </section>
  );
}

export default ContextBurgerMenu;
