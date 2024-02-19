import React, { useState, useEffect, useContext } from "react";
// import CurrentUserContext from '../../contecst/CurrentUserContext.js';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';
import { mainApi } from "../../utils/MainApi";

function SavedMovies({ isLoading, setIsLoading, isLoggedIn }) {
    const [searchResults, setSearchResults] = useState([]);//массив найденных фильмов
    const [savedMovies, setSavedMovies] = useState([]);//массив с сохраненнными фильмами
    // const currentUser = useContext(CurrentUserContext);
    //отправка данных о сохраненных фильмах на сервер//сохранение фильма
    // const handleSavedMovies = async (data) => {//сабмит
    //     setIsLoading(true)
    //     try {
    //       const newSavedMovie = await mainApi.savedMovie(data);
    //       //console.log(await mainApi.saveMovie())
    //       //console.log(newMovie)
    //       setSavedMovies([newSavedMovie, ...savedMovies]);
    //       //setSavedMovies(newSavedMovie.data);     
    //       setIsLoading(false);
    //     } catch (err) {
    //       console.log(err)
    //     }
    //   }

    // const handleSavedMovies = async (card) => {//сабмит        
    //     // const isLiked = card.cardData.likes.some((id) => id === currentUser._id);
    //     setIsLoading(true)
    //     if (card.cardData.likes.some((id) => id === currentUser._id)) {
    //         mainApi.deleteMovie(card.id)
    //             .then((newSavedMovie) => {
    //                 setSavedMovies((state) => state.map((c) => c.id === card.id ? newSavedMovie : c));
    //                 console.log("удаление")
    //             })
    //             .catch((e) => console.error(e?.reason || e?.message))
    //     } else {
    //         mainApi.savedMovie(card.id)
    //             .then((newSavedMovie) => {
    //                 setSavedMovies((state) => state.map((c) => (c.id === card.id ? newSavedMovie : c)));
    //                 setSavedMovies([newSavedMovie, ...savedMovies]);
    //                 console.log("сохранение")
    //                 setIsLoading(false);
    //             })
    //             .catch((e) => console.error(e?.reason || e?.message))
    //     }
    // }
    //загрузка сохраненных фильмов на странице
    useEffect(() => {
        //const token = localStorage.getItem('token');
        setIsLoading(true);
        if (isLoggedIn) { //token вместо isLoggedIn
            Promise.all([mainApi.getSavedMovies()])
                .then(([savedMovies]) => {
                    setSavedMovies(savedMovies);
                    setSearchResults(savedMovies);
                    localStorage.setItem('savedMovies', JSON.stringify(mainApi));
                })
                .catch((e) => {
                    console.error(e?.reason || e?.message);
                    localStorage.clear();
                })
                .finally(() => setIsLoading(false))
        }
    }, [isLoggedIn, setIsLoading]);
    
    return (
        <>
            <section className='saved-movies movies'>
                <SearchForm />
                {isLoading ? <Preloader /> : (
                    <MoviesCardList
                        // onSavedMovies={handleSavedMovies}
                        movies={searchResults} />
                    // {/* <div className='saved-movies__gap'></div> */}
                )}
            </section >
        </>
    )
}
export default SavedMovies