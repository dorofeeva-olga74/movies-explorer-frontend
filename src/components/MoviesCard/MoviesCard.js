import React, { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard(props) {
    const { movie, index, onMovieDelete, onMovieLike, savedMovies } = props;
    const [isSaved, setIsSaved] = useState(savedMovies.some((m) => m.movieId === movie.id));//состояние сохранения фильма
    //console.log(movie)   
    const location = useLocation(); 
    
    const filmDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;      
        return `${hours}ч ${remainingMinutes}м`;
      }
      const duration = filmDuration(movie.duration);
    const handleSavedClick = useCallback((e) => { 
        e.preventDefault();         
        //console.log(movie);
        if(!isSaved) {
            onMovieLike(movie);
            console.log('like')
            setIsSaved(!isSaved);
        } else {
            onMovieDelete(movie);
            setIsSaved(false);
            console.log('deslike')  
        }
    }, [movie, onMovieLike, onMovieDelete, isSaved])

    const handleDelete = () => {
        onMovieDelete(movie);
        setIsSaved(isSaved);
    }

    return (
        <article className='card'>
            <img className='card__img' src={`https://api.nomoreparties.co${movie.image.url}`} alt={`Постер фильма ${movie.nameRU}`} />
            <div className={'card__title-section'}>
                <h3 className={'card__title'}>{movie.nameRU}</h3>
                {location.pathname === '/movies' ?
                    <button
                        onClick={handleSavedClick}
                        id={'save'}
                        type={"button"}
                        aria-label={'Кнопка сохранения'}
                        //disabled={isSaved}                        
                        className={`card__save ${isSaved ? 'card__save_active' : ''}`}>
                    </button> :
                    <button
                        index={index}
                        onClick={handleDelete}
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
 