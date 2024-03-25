import React from 'react';
import ContextBurgerMenu from '../ContextBurgerMenu/ContextBurgerMenu';
import BurgenMenuImg from '../../images/BurgenMenuImg.svg';

function BurgenMenu({ onCloseOverlay, isOpen, setIsContextBurgerMenuOpened, onClose }) {
  const handleContextBurgerMenuClick = () => {
    setIsContextBurgerMenuOpened(true);
  };

  return (
    <>
      <button
        className='burgen-menu'
        onClick={handleContextBurgerMenuClick}>
        <img
          className='burgen-img'
          src={BurgenMenuImg}
          alt='Изображение БургерМеню'
        />
      </button>
      <ContextBurgerMenu
        onCloseOverlay={onCloseOverlay}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default BurgenMenu;
