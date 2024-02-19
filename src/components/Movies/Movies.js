import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';

function Movies({ isLoading, setIsLoading, isShortFilm, setIsShortFilm, onSubmit, 
    allFilteredMovies, value, setValue, savedMovies, setSavedMovies, onMovieLike, onMovieDelete}) {

    return (
        <main>
            <section className='movies'>
                <SearchForm
                    setValue={setValue}
                    value={value}
                    setIsLoading={setIsLoading}
                    onSubmit={onSubmit}
                    isShortFilm={isShortFilm}
                    setIsShortFilm={setIsShortFilm}  
                />
                {isLoading ? <Preloader /> : (
                    <MoviesCardList
                        allFilteredMovies={allFilteredMovies}
                        value={value}
                        savedMovies={savedMovies}
                        setSavedMovies={setSavedMovies}
                        onMovieLike={(movie)=>onMovieLike(movie)}
                        onMovieDelete={(movie)=>onMovieDelete(movie)}                  
                    />
                )}
            </section >
        </main>
    )
}
export default Movies
