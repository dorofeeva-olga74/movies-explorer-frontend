import React from 'react';

function Footer() {
  return (
    <footer className='footer'>
      <span className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</span>
      <div className='footer__container'>
        <span className='footer__data'>© {new Date().getFullYear()}</span>
        <nav className='footer__links'>
          <a
            className='footer__link'
            href='https://practicum.yandex.ru'
            target='_blank'
            rel='noreferrer'>
            Яндекс.Практикум
          </a>
          <a
            className='footer__link'
            href='https://github.com/dorofeeva-olga74 '
            target='_blank'
            rel='noreferrer'>
            Github
          </a>
        </nav>
      </div>
    </footer>
  );
}
export default Footer;
