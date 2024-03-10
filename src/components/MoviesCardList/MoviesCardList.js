import React, { useMemo, useState, useEffect, useRef } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import { SCREEN_WIDTH_LARGE,
  SCREEN_WIDTH_MEDIUM,
  SCREEN_WIDTH_SMALL,
  MOVIES_COUNT_LARGE,
  MOVIES_COUNT_MEDIUM,
  MOVIES_COUNT_SMALL,
  MOVIES_COUNT_EXTRA_SMALL,
  // MOVIES_TO_ADD_LARGE,
  // MOVIES_TO_ADD_MEDIUM,
  // MOVIES_TO_ADD_SMALL,
  // MOVIES_TO_ADD_EXTRA_SMALL,
  SHORT_FILM_DURATION, 
  RESIZE_DELAY,} from '../../utils/constants.js';

// получаю колличество фильмов на странице при первой загрузке
const getMoviesCountOnPage = (screenWidth) => {
  if (screenWidth > SCREEN_WIDTH_LARGE) {
    return MOVIES_COUNT_LARGE;
  } else if (screenWidth > SCREEN_WIDTH_MEDIUM) {
    return MOVIES_COUNT_MEDIUM;
  } else if (screenWidth > SCREEN_WIDTH_SMALL) {
    return MOVIES_COUNT_SMALL;
  } else {
    return MOVIES_COUNT_EXTRA_SMALL;
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
      if (currentIsShort && movie.duration > SHORT_FILM_DURATION) {
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
  // Функция для обработки нажатия на кнопку 'Еще'
// const handleMoreClick = () => {
//   let moviesToAdd = screenWidth > SCREEN_WIDTH_LARGE ? MOVIES_TO_ADD_LARGE :
//                     screenWidth > SCREEN_WIDTH_MEDIUM ? MOVIES_TO_ADD_MEDIUM :
//                     screenWidth > SCREEN_WIDTH_SMALL ? MOVIES_TO_ADD_SMALL :
//                     MOVIES_TO_ADD_EXTRA_SMALL;
  
//   setMoviesCountOnPage((prevCount) => prevCount + moviesToAdd);
// }

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
      timerId.current = setTimeout(handleResize, RESIZE_DELAY);
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
                <h2 className='movies-error-title'>Ничего не найдено.</h2>
                {/* <h2 className='movies-error-title'>
                  {allFilteredMovies.length === 0 && movies.length > 0 ? 'Ничего не найдено' : 'Нет сохраненных фильмов.'}                 
                </h2> */}              
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
