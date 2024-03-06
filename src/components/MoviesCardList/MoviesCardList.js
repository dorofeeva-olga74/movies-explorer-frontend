import React, { useMemo, useState, useEffect, useRef } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

// получаю колличество фильмов на странице при первой загрузке
const getMoviesCountOnPage = (screenWidth) => {
  if (screenWidth > 1150) {
    return 16;
  } else if (screenWidth > 800) {
    return 12;
  } else if (screenWidth > 650) {
    return 8;
  } else {
    return 5;
  }
};

function MoviesCardList({
  serverError,
  handleMovieLikeToggle,
  movies,
  searchInputValue,
  isShortFilm,
  savedMovies, 
  isShortSavedFilm, 
}) {
  const location = useLocation();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // ширина экрана
  const [moviesCountOnPage, setMoviesCountOnPage] = useState(getMoviesCountOnPage(screenWidth)); // количество фильмов на странице при загрузке

  const allFilteredMovies = useMemo(() => {
    if (!searchInputValue && location.pathname === '/movies') {
      return [];
    }
    // фильтрация для короткометражек
    const filtredMovies = movies.filter((movie) => {
      const currentIsShort = location.pathname === '/movies' ? isShortFilm : isShortSavedFilm;
      if (currentIsShort && movie.duration > 40) {
        return false;
      }
      setMoviesCountOnPage(getMoviesCountOnPage(screenWidth));
      // фильтрация по названию
      const nameRU = movie.nameRU.toLowerCase().includes(searchInputValue.toLowerCase());
      const nameEN = movie.nameEN.toLowerCase().includes(searchInputValue.toLowerCase());
      return nameRU || nameEN;
    });
    localStorage.setItem('allFilteredMovies', JSON.stringify(filtredMovies));

    return filtredMovies;
  }, [searchInputValue, location.pathname, movies, isShortFilm, screenWidth, isShortSavedFilm]);

  let visibleMovies;
  location.pathname === '/movies'
    ? (visibleMovies = allFilteredMovies.slice(0, moviesCountOnPage))
    : (visibleMovies = allFilteredMovies);

  // управление кнопкой 'Еще'
  function handleMoreClick() {
    let moviesToAd = 0;
    if (screenWidth > 1150) {
      moviesToAd = 4;
    } else if (screenWidth > 800) {
      moviesToAd = 3;
    } else if (screenWidth > 650) {
      moviesToAd = 2;
    } else {
      moviesToAd = 2;
    }
    // добавление фильмов для дополнительной загрузки на страницу к предыдущим
    setMoviesCountOnPage((prevCount) => prevCount + moviesToAd);
  }

  // создаю переменную для хранения идентификатора таймера
  const timerId = useRef(null);
  // управление положением экрана
  useEffect(() => {
    const handleResize = () => {
      // получаю новую ширину экрана
      const newScreenWidth = window.innerWidth;
      // получаю новое количество фильмов на странице
      const newMoviesCountOnPage = getMoviesCountOnPage(newScreenWidth);
      // если ширина экрана или количество фильмов на странице изменились, то обновляю состояние
      if (screenWidth !== newScreenWidth || moviesCountOnPage !== newMoviesCountOnPage) {
        setScreenWidth(newScreenWidth);
        setMoviesCountOnPage(newMoviesCountOnPage);
      }
    };
    window.addEventListener('resize', () => {
      // если таймер уже запущен, то отменяю его
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      // запускаю новый таймер с задержкой 300 миллисекунд      
      timerId.current = setTimeout(handleResize, 300);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [timerId, screenWidth, moviesCountOnPage]);

  return (    
     <>
      {serverError.isValid ? (
        <h2 className='movies-error-title'>{serverError.text}</h2>
      ) : (
        <>
          <section className='movies__card-list'>
            {allFilteredMovies.length > 0 ? (
              visibleMovies.map((movie, index) => (
                <MoviesCard
                  index={index + 1}
                  movie={movie}
                  key={movie.movieId}
                  name={movie.nameRU}
                  savedMovies={savedMovies}
                  handleMovieLikeToggle={handleMovieLikeToggle}                 
                />
              ))
            ) : (
              <>
                <div className='movies__gap'></div>
                <h2 className='movies-error-title'>
                  {savedMovies.length > 0 ? 'Ничего не найдено' : 'Нет сохраненных фильмов.'}
                </h2>
              </>
            )}
          </section>
          {allFilteredMovies.length > moviesCountOnPage && location.pathname === '/movies' && (
            <div className='movies__more-adding'>
              <button
                className='movies__more-btn'
                type='button'
                onClick={handleMoreClick}>
                Ещё
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default MoviesCardList;
