import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';

function Movies({
  setSearchInputValue,
  searchInputValue,
  setIsLoading,
  isShortFilm,
  setIsShortFilm,
  isLoading,
  handleMovieLikeToggle,
  movies,
  savedMovies,
  setSavedMovies,
  serverError,
}) {
  console.log(movies)
  return (
    <main className='main'>
      <section className='movies'>
        <SearchForm
          setSearchInputValue={setSearchInputValue}
          searchInputValue={searchInputValue}
          setIsLoading={setIsLoading}
          isShortFilm={isShortFilm}
          setIsShortFilm={setIsShortFilm}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            serverError={serverError}
            handleMovieLikeToggle={handleMovieLikeToggle}
            movies={movies}
            searchInputValue={searchInputValue}
            isShortFilm={isShortFilm}
            savedMovies={savedMovies}
          />
        )}
      </section>
    </main>
  );
}
export default Movies;
