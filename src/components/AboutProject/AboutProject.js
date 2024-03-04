import React from 'react';

function AboutProject() {
  return (
    <>
      <section className='about-project'>
        <h2 className='about-project_header'>О проекте</h2>
        <div className='about-project__info-container'>
          <div className='about-project__info'>
            <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
            <p className='about-project__text'>
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </div>
          <div className='about-project__info'>
            <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
            <p className='about-project__text'>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className='about-project__timeline'>
          <p className='about-project__timeline-green'>1 неделя</p>
          <p className='about-project__timeline-grey'>4 недели</p>
          <p className='about-project__timeline-backend'>Back-end</p>
          <p className='about-project__timeline-frontend'>Front-end</p>
        </div>
      </section>
    </>
  );
}
export default AboutProject;
