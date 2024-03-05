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
  setMovies,
  savedMovies,
  setSavedMovies,
  serverError,  
}) {
  // const [result, setResult] = useState([]);
  //  // Обработчик отправки формы, который вызывает функцию поиска по данным и обновляет результат поиска в состоянии компонента
  //  const handleSearchFormSubmit = (e) => {
  //   // Предотвращаем перезагрузку страницы при отправке формы
  //   e.preventDefault();
  //   // Вызываем функцию поиска по данным, используя значение ввода в качестве аргумента
  //   const searchResult = setMovies(searchInputValue); // вместо setMovies нужно вставить результат фильтрации т е фильтрмувис
  //   // Обновляем результат поиска в состоянии компонента
  //   setResult(searchResult);
  // };
  
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
          setSavedMovies={ setSavedMovies}
          // onSearchFormSubmit={handleSearchFormSubmit}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <MoviesCardList
              serverError={serverError}
              handleMovieLikeToggle={handleMovieLikeToggle}
              movies={movies}
              searchInputValue={searchInputValue}
              isShortFilm={isShortFilm}
              savedMovies={savedMovies}
            />
          </>
        )}
      </section>
    </main>
  );
}
export default Movies;
