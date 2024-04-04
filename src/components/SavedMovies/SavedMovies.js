import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';

function SavedMovies({
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
  isShortSavedFilm,
  setIsShortSavedFilm,
}) {
  return (
    <section className='saved-movies movies'>
      <SearchForm
        setSearchInputValue={setSearchInputValue}
        searchInputValue={searchInputValue}
        setIsLoading={setIsLoading}
        isShortFilm={isShortFilm}
        setIsShortFilm={setIsShortFilm}
        isShortSavedFilm={isShortSavedFilm}
        setIsShortSavedFilm={setIsShortSavedFilm}
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
          isShortSavedFilm={isShortSavedFilm}
        />
      )}
    </section>
  );
}
export default SavedMovies;
