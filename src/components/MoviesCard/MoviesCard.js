import React, { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({handleMovieLikeToggle, movie, index, savedMovies } ) {
    const [isSaved, setIsSaved] = useState(savedMovies.some((m) => m.movieId === movie.movieId));//состояние сохранения фильма
    //console.log(movie)   
    const location = useLocation(); 
    
    const filmDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;      
        return `${hours}ч ${remainingMinutes}м`;
      }
      const duration = filmDuration(movie.duration);

    const handleSavedClick = (e) => { 
        e.stopPropagation();         
        //console.log(movie);
        handleMovieLikeToggle(movie)
        if(!isSaved) {            
            setIsSaved(!isSaved);
        } else {            
            setIsSaved(false);            
        }
    }   

    const openTrailer = () => {
        window.open(movie.trailerLink, '_blank');
    }

    return (
        <article className='card' onClick={() =>openTrailer()}>
            <img className='card__img' src={movie.image} alt={`Постер фильма ${movie.nameRU}`} />
            <div className={'card__title-section'}>
                <h3 className={'card__title'}>{movie.nameRU}</h3>
                {location.pathname === '/movies' ?
                    <button
                        onClick={(e) => handleSavedClick(e)}
                        id={'save'}
                        type={"button"}
                        aria-label={'Кнопка сохранения'}
                        //disabled={isSaved}                        
                        className={`card__save ${isSaved ? 'card__save_active' : ''}`}>
                    </button> :
                    <button
                        index={index}
                        onClick={(e) => handleSavedClick(e)}
                        id={'save'}
                        type={"button"}
                        aria-label={'Кнопка сохранения'}
                        className={'card__delete'}>
                    </button>}
            </div>
            <p className={'card__time-long'}>{duration}</p>
        </article>
    )
}
export default MoviesCard
 