import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ handleMovieLikeToggle, movie, index, savedMovies }) {
   // проверяем, существует ли savedMovies
   if (!savedMovies) {
    // если нет, то возвращаем null или заглушку
    return null;
  }
  const isSavedOutside = savedMovies.some((m) => m.movieId === movie.movieId);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isSaved, setIsSaved] = useState(isSavedOutside); //состояние сохранения фильма
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();

  const filmDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}ч ${remainingMinutes}м`;
  };
  const duration = filmDuration(movie.duration);

  const handleSavedClick = (e) => {    
    e.stopPropagation();
    handleMovieLikeToggle(movie);
    if (!isSaved) {
      setIsSaved(!isSaved);
    } else {
      setIsSaved(false);
    }    
  };
  // useEffect(() => {
  //   location.pathname === '/saved-movies' &&  !isSaved ? setSearchInputValue('') 
  //     setSearchInputValue(localStorage.getItem('searchInputValue') || '')
  //     : setSearchInputValue('') && setSavedMovies(localStorage.getItem('allSavedMovies', savedMovies));
  //   return () => {
  //     setSearchInputValue('');
  //   };
    
  // }, [location.pathname, savedMovies, setSavedMovies, setSearchInputValue]);
  // if (!savedMovies) {
  //   // если нет, то возвращаем null или заглушку
  //   return null;
  //  }
  // const filmDuration = (minutes) => {
  //   const hours = Math.floor(minutes / 60);
  //   const remainingMinutes = minutes % 60;
  //   return `${hours}ч ${remainingMinutes}м`;
  // };
  // const duration = filmDuration(movie.duration);

  // const handleSavedClick = (e) => {
  //   e.stopPropagation();
  //   handleMovieLikeToggle(movie, !isSavedOutside);    
  // }; 
  // Функция для удаления фильма из сохраненных
  // const handleMovieDelete = (setSavedMovies, movie) => {
  //   // Обновление списка сохраненных фильмов без удаленного фильма
  //   // const updatedSavedMovies = savedMovies.filter(movie => movie.movieId !== movieId);
  //       // handleMovieLikeToggle(movie);
  //       setSavedMovies(handleMovieLikeToggle(movie));
  //   // Поскольку состояние поискового запроса не сохраняется, ничего не делаем с ним
  // };
  const openTrailer = () => {
    window.open(movie.trailerLink, '_blank');
  };

  return (
    <article
      className='card'
      onClick={() => openTrailer()}>
      <img
        className='card__img'
        src={movie.image}
        alt={`Постер фильма ${movie.nameRU}`}
      />
      <div className={'card__title-section'}>
        <h3 className={'card__title'}>{movie.nameRU}</h3>
        {location.pathname === '/movies' ? (
          <button
            onClick={(e) => handleSavedClick(e)}
            id={'save'}
            type={'button'}
            aria-label={'Кнопка сохранения'}
            className={`card__save ${isSaved ? 'card__save_active' : ''}`}></button>
        ) : (
          <button
            index={index}
            onClick={(e) => handleSavedClick(e)}
            id={'save'}
            type={'button'}
            aria-label={'Кнопка сохранения'}
            className={'card__delete'}></button>
        )}
      </div>
      <p className={'card__time-long'}>{duration}</p>
    </article>
  );
}
export default MoviesCard;
