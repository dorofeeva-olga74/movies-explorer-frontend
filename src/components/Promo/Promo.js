import React from 'react';
import { NavLink } from 'react-router-dom';
import LandingLogo from '../../images/LandingLogo.svg';

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__container-img'>
        <img
          className='promo__img'
          src={LandingLogo}
          alt='Стилистическое изображение земного шара'
        />
      </div>
      <div className='promo__container'>
        <h1 className='promo__title'>Учебный проект студента факультета Веб&#8288;-&#8288;разработки.</h1>
        <p className='promo__text'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <nav className='promo__nav-box'>
          <NavLink
            to='/about-project'
            className='promo__nav'
            href='#more'>
            Узнать больше
          </NavLink>
        </nav>
      </div>
    </section>
  );
}
export default Promo;
