import React from "react";
import { NavLink } from "react-router-dom";

function Menu() {
    return (
        <div className='menu'>
            <NavLink to='/movies' className='menu__movies'>Фильмы</NavLink>
            <NavLink to='/saved-movies' className='menu__movies menu__movies_saved'>Сохраненные фильмы</NavLink>
        </div>
    )
}

export default Menu;