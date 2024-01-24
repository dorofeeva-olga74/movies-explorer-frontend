import React from 'react';
import photo from '../../images/photoMe.svg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
    return (
        <>
            <section className='aboutMe'>
                <h2 className='aboutMe_header'>Студент</h2>
                <hr className='aboutMe__line' />
                <div className='aboutMe__container'>
                    <div className='aboutMe__info'>
                        <h3 className='aboutMe__title'> Ольга</h3>
                        <p className='aboutMe__subtitle'>Фронтенд-разработчик, 50 лет</p>
                        <p className='aboutMe__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.  С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                        <a className='aboutMe__link' href='https://github.com/dorofeeva-olga74' >Github</a>
                    </div>
                    <img className='aboutMe__photo' src={photo} alt="Фото фронтенд-разработчика" />
                </div>
                <Portfolio />
            </section >
        </>
    )
}
export default AboutMe