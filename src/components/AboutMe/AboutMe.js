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
            <p className='about-me__text'>
              Я родилась во Владивостоке, закончила факультет технологии изготовления швейных изделий ВТУ №38 г.Владивостока в
              1994г. После окончания - долгое время работала в ГКУ "Тихоокеанский симфонический оркестр и театр
              "Классическая опера" в должности начальтника отдела кадров. Заканчивая школу в 1991 году, хотела поступать
              в ДВФУ на факультет "Прикладная математика". Но родители были против этой профессии, говорили, что она
              "мужская". В силу возраста, к сожалению, я их послушала и выбрала другую профессию. Прошло много лет, я вырастила дочь. И именно она
              посоветовала поступить на курс по веб-разработке в "Яндекс-Практикум". Так сбылась моя
              детская мечта! После окончания обучения очень хотелось бы работать в сфере IT и заниматься frontend
              разработкой, тк получаю удовольствие от создания красивых и удобных интерфейсов для пользователей.
              Понимаю, что, в силу моего возраста, шансы не велики. Но в любом случае, frontend-разработка останется
              моим хобби, если не станет профессией.
            </p>
            <a
              className='about-me__link'
              href='https://github.com/dorofeeva-olga74'
              target='_blank'
              rel='noreferrer'>
              Github
            </a>
          </div>
          <img
            className='about-me__photo'
            src={photo}
            alt='Фото фронтенд-разработчика'
          />
        </div>
        <Portfolio />
      </section>
    </>
  );
}
export default AboutMe;
