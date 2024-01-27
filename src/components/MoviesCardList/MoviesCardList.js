import React from 'react';
// import { memo } from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ moviesCard }) {
    return (
        <>
            <section className='movies__card-list'>
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
            </section>
            <div className='movies__more-adding'>
                <button className='movies__more-btn' type='button'>Ещё</button>
            </div>
        </>

    )
}
export default MoviesCardList;