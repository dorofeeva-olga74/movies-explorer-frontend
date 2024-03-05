import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';

function SavedMovies({
  setSearchInputValue,
  searchInputValue,
  // searchSavedInputValue,
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
   // Функция для обработки сабмита формы поиска
  //  const handleSearchSubmit = (searchQuery) => {
  //   setSearchInputValue(searchQuery);   
  // };

  return (
    <>
      <section className='saved-movies movies'>
        <SearchForm  
          setSearchInputValue={setSearchInputValue}
          searchInputValue={searchInputValue}
          // searchSavedInputValue={searchSavedInputValue}
          setIsLoading={setIsLoading}
          isShortFilm={isShortFilm}
          setIsShortFilm={setIsShortFilm}
          isShortSavedFilm={isShortSavedFilm}
          setIsShortSavedFilm={setIsShortSavedFilm}
          // onSearchFormSubmit={onSearchFormSubmit}          
          savedMovies={savedMovies}
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
            setSavedMovies={setSavedMovies}
            isShortSavedFilm={isShortSavedFilm}
          />
        )}
      </section>
    </>
  );
}
export default SavedMovies;
