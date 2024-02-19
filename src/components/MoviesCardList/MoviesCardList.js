import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ onMovieLike, onMovieDelete, onClick, isSaved, onSavedMovies, 
    allFilteredMovies, value, savedMovies, setSavedMovies }) {
    // const location = useLocation();    
    console.log(allFilteredMovies);

    return (
        <>
            <section className='movies__card-list'>
                {value ? allFilteredMovies.map((movie, index) => (
                    <MoviesCard
                        index={index + 1}
                        movie={movie}
                        key={movie.id}
                        name={movie.nameRU}
                        allFilteredMovies={allFilteredMovies}
                        savedMovies={savedMovies}
                        setSavedMovies={setSavedMovies}
                        //onClick={(e, movie) => onClick(e, movie)}
                        isSaved={isSaved}
                        onMovieDelete={(movie)=>onMovieDelete(movie)}
                        onMovieLike={(movie)=>onMovieLike(movie)}
                        isLiked={ savedMovies.some((m) => m.movieId === movie.id)}                       
                    //handleMovieLike={handleMovieLike}
                    //onSavedMovies={onSavedMovies}
                    //isSaved={isSaved}                        
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