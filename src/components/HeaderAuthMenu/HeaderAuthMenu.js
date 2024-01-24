import React from "react";
import { NavLink } from "react-router-dom";

function HeaderAuthMenu() {
    return (
        <div className='header__container'>
            <NavLink to='/signup' className='header__textAuth'>Регистрация</NavLink>
            <NavLink to='/signin' className='header__textLogin'>Войти</NavLink>
        </div>        
    )
}

export default HeaderAuthMenu;