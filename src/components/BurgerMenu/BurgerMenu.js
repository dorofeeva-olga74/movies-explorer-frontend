import React, { useState } from 'react';
import ContextBurgerMenu from '../ContextBurgerMenu/ContextBurgerMenu';

import BurgenMenuImg from "../../images/BurgenMenuImg.svg"

function BurgenMenu() {
    const [isOpen, setIsOpen] = useState(false);
 
    const handleContextBurgerMenuClick = () => {
        setIsOpen(true);
        console.log('Была нажата кнопка.');
    }
    const contextBurgerMenuClose = () => {
        setIsOpen(false);
    }
    return (
        <>
            <button className='burgenMenu' onClick={handleContextBurgerMenuClick}>
                <img className='burgenMenuImg' src={BurgenMenuImg} alt='Изображение БургерМеню' />
            </button>
            <ContextBurgerMenu
                isOpen={isOpen}
                onClose={contextBurgerMenuClose}                
            />
        </>
    )
}

export default BurgenMenu;