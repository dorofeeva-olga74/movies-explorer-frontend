import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ handleMovieLikeToggle, 
    allFilteredMovies, value, savedMovies }) {
    // const location = useLocation();
    // console.log(allFilteredMovies);
    
    return (
        <>
            <section className='movies__card-list'>
                {value ? allFilteredMovies.map((movie, index) => (
                    <MoviesCard
                        index={index + 1}
                        movie={movie}
                        key={movie.id}
                        name={movie.nameRU}              
                        savedMovies={savedMovies}                                      
                        handleMovieLikeToggle={handleMovieLikeToggle}                                         
                    />
                )) : []}
            </section>
            {allFilteredMovies.length === 0 ? <h2 className='movies-error-title'>'Ничего не найдено'</h2> : <div className='movies__more-adding'>
                <button className='movies__more-btn' type='button'>Ещё</button>
            </div>}

        </>
    )
}
export default MoviesCardList;