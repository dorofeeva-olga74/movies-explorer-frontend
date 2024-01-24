import React from 'react';

function Techs() {
    return (
        <>
            <section className='techs'>
                <p className='techs_header'>Технологии</p>
                <hr className='techs__line' />
                <h2 className='techs__subtitle'>7 технологий</h2>
                <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className='techs__lists'>
                    <li className='techs__list'>HTML</li>
                    <li className='techs__list'>CSS</li>
                    <li className='techs__list'>JS</li>
                    <li className='techs__list'>React</li>
                    <li className='techs__list'>Git</li>
                    <li className='techs__list'>Express.js</li>
                    <li className='techs__list'>mongoDB</li>
                </ul>
            </section >
        </>
    )
}
export default Techs