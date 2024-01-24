import React from 'react';

function AboutProject() {
    return (
        <>
            <section className='about-project'>
                <p className='about-project_header'>О проекте</p>
                <hr className='about-project__line' />
                <div className='about-project__info-container'>
                    <div className='about-project__info'>
                        <p className='about-project__subtitle'>Дипломный проект включал 5 этапов</p>
                        <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className='about-project__info'>
                        <p className='about-project__subtitle'>На выполнение диплома ушло 5 недель</p>
                        <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className='about-project__timeline'>
                    <div className='about-project__timeline-green'>1 неделя</div>
                    <div className='about-project__timeline-grey'>4 недели</div>
                    <figcaption className='about-project__timeline-backend'>Back-end</figcaption>
                    <figcaption className='about-project__timeline-frontend'>Front-end</figcaption>
                </div>
            </section >
        </>
    )
}
export default AboutProject