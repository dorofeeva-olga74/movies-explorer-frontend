import React from 'react';

function Portfolio() {
  return (
    <>
      <section className='portfolio'>
        <h3 className='portfolio__header'>Портфолио</h3>
        <ul className='portfolio__lists'>
          <li className='portfolio__list'>
            <a
              className='portfolio__link'
              href='https://github.com/dorofeeva-olga74/how-to-learn'
              target='_blank'
              rel='noreferrer'>
              Статичный сайт
            </a>
            <span className='portfolio__link portfolio__link_arrow'>↗</span>
          </li>
          <li className='portfolio__list'>
            <a
              className='portfolio__link'
              href='https://dorofeeva-olga74.github.io/russian-travel/'
              target='_blank'
              rel='noreferrer'>
              Адаптивный сайт
            </a>
            <span className='portfolio__link portfolio__link_arrow'>↗</span>
          </li>
          <li className='portfolio__list'>
            <a
              className='portfolio__link'
              href='https://github.com/dorofeeva-olga74/mesto-react'
              target='_blank'
              rel='noreferrer'>
              Одностраничное приложение
            </a>
            <span className='portfolio__link portfolio__link_arrow'>↗</span>
          </li>
        </ul>
      </section>
    </>
  );
}
export default Portfolio;
