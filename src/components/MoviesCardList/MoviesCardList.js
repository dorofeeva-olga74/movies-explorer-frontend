import React, { useMemo, useState, useEffect}from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ handleMovieLikeToggle, getAllMovies, getAllLikedMovies,
    movies, searchInputValue, isShortFilm, setIsShortFilm, savedMovies }) {
    const location = useLocation();
    console.log(movies);
    const [filteredMoviesList, setFilteredMoviesList] = useState([]); // массив отфильтрованных фильмов
    const allFilteredMovies = useMemo(() => { 
        //для сохраненных - это не подойдет
        //  location.pathname === '/movies' ? 
        if (!searchInputValue && location.pathname === '/movies') {
          return [];
        }

        const filtredMovies = movies.filter((movie) => {
          if (isShortFilm && movie.duration > 40) {
            return false;
          }
          console.log(movie.nameRU.toLowerCase())
          console.log(searchInputValue.toLowerCase())
          const nameRU = movie.nameRU.toLowerCase().includes(searchInputValue.toLowerCase());
          const nameEN = movie.nameEN.toLowerCase().includes(searchInputValue.toLowerCase());
          return nameRU || nameEN;
        });
        // console.log(filtredMovies);
        localStorage.setItem('searchInputValue', searchInputValue);
        localStorage.setItem('isShortFilm', isShortFilm);
        localStorage.setItem('allFilteredMovies', JSON.stringify(filtredMovies));
        setFilteredMoviesList(filtredMovies);    
        return filtredMovies;
      }, [searchInputValue, movies, isShortFilm, setFilteredMoviesList]);

  
    return (
        <>
            <section className='movies__card-list'>
                {searchInputValue ? allFilteredMovies.map((movie, index) => (
                    <MoviesCard
                        index={index + 1}
                        movie={movie}
                        key={movie.movieId}
                        name={movie.nameRU}              
                        savedMovies={savedMovies}                                      
                        handleMovieLikeToggle={handleMovieLikeToggle}                                         
                    />
                )) : []}
            </section>
            {movies.length === 0 ? <h2 className='movies-error-title'>'Ничего не найдено'</h2> : <div className='movies__more-adding'>
                <button className='movies__more-btn' type='button'>Ещё</button>
            </div>}

        </>
    )
}
export default MoviesCardList;