import React from 'react';
import photo from '../../images/photoMe.svg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
    return (
        <>
            <section className='about-me'>
                <h2 className='about-me_header'>Студент</h2>                
                <div className='about-me__container'>
                    <div className='about-me__info'>
                        <h3 className='about-me__title'> Ольга</h3>
                        <p className='about-me__subtitle'>Фронтенд-разработчик, 50 лет</p>
                        <p className='about-me__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.  С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                        <a className='about-me__link' href='https://github.com/dorofeeva-olga74' target='_blank' rel='noreferrer'>Github</a>
                    </div>
                    <img className='about-me__photo' src={photo} alt="Фото фронтенд-разработчика" />
                </div>
                <Portfolio />
            </section >
        </>
    )
}
export default AboutMe