import React, { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
//import { mainApi } from '../../utils/MainApi.js';
//import { mainApi } from "../../utils/MainApi";
// import isOnSavedList from '../../images/cardFilm.svg';

function MoviesCard(props) {
    //const { movie, isSaved, onClick, savedMovies, setSavedMovies} = props;
    const { movie, index, onMovieDelete, onMovieLike, savedMovies } = props;
    const [isSaved, setIsSaved] = useState(savedMovies.some((m) => m.movieId === movie.id));//состояние сохранения фильма
    //console.log(movie)   
    const location = useLocation(); 
   
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
            <p className={'card__time-long'}>1ч42м</p>
        </article>
    )
}
export default MoviesCard
 //const [isSaved, setIsSaved] = useState(false);//состояние сохранения фильма
    //const [savedMovies, setSavedMovies] = useState([]);// сохраненные фильмы  
    // Определяем, есть ли у карточки лайк
    //const isSaved = props.card.id.some(id => id === Object.id);
    //const index = favoriteFilms.findIndex((c) => c.movieId === card.movieId);
    //const cardLikeButtonClassName = `element__like ${isLiked ? "element__like_active" : "element__like"}`;
    //const location = useLocation();
    //const [isSaved, setIsSaved] = useState(false);//состояние сохранения фильма
    //const [savedCards, updateSavedCards] = useState([]);
    //const [likedBands, updateLikedBands] = React.useState([]);
    // Здесь мы объявляем новую переменную состояния. Эти переменные сохраняются до тех пор, 
    // пока соответствующий компонент не будет повторно отрисован.
    //console.log(index);

    //console.log(movie);
 // const handleSavedClick = (e) => {
    //     e.preventDefault();        
    //     let currentSavedCards = savedMovies;
    //     //console.log(currentSavedCards)
    //     if (!isSaved) {
    //         setIsSaved(true);
    //         if (!currentSavedCards.includes(card.id))
    //             props.setSavedMovies(
    //                 [...currentSavedCards, card.id]
    //             );
    //     } else {
    //         setIsSaved(false);
    //         if (currentSavedCards.includes(card.id))
    //             props.setSavedMovies(
    //                 currentSavedCards
    //                     .filter(card => card !== card.id)
    //             );

    //     }
    //     console.log(currentSavedCards)
    // };

    // function handleSavedClick() {
    //     //props.onCardLike(props)
    //     alert(pos);
    //   }

    // const handleSavedClick = async (movie) => {
    //     console.log(movie)//приходит обьект!!!!!!!!!!!!!
    //     //const isLiked = card.cardData.likes.some((id) => id === currentUser._id);
    //     const isLiked = setSavedMovies.some((id) =>id === movie.id)
    //     try {
    //         if (isLiked) {
    //             //setIsSaved(false);
    //             handleDeleteMovie(movie)
    //         } else {
    //             //setIsSaved(true);
    //             const newMovie = await mainApi.savedMovie(movie)
    //             setSavedMovies((state) => state.filter((m) => (m.id === movie.id ? newMovie : m.i)));
    //             setSavedMovies([newMovie, ...savedMovies]);         
    //         }

    //     } catch (e) {
    //         console.log(e);
    //        // console.error(e?.reason || e?.message)
    //     }
    // }
    // //удаление фильма из сохраненных
    // const handleDeleteMovie = async (movie) => {
    //     try {
    //         await mainApi.deleteMovie(setSavedMovies.find((m) => m.movieId === movie.id)._id);
    //         //console.log(movie);
    //         setSavedMovies((state) => state.filter((m) => m.movieId === movie.id ? '' : m.movieId))
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    // const handleSavedClick = (e, disabled) => {
    //     e.preventDefault();
    //     if ( disabled ) { 
    //         return; 
    //     }
    //     setIsSaved(!isSaved);
    //     //console.log('сохранить'); 
    // }