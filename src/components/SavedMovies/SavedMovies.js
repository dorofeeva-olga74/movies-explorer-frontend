import React, { useState, useEffect } from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';
import { mainApi } from "../../utils/MainApi";

function SavedMovies({ isLoading, setIsLoading, isLoggedIn }) {
    const [searchResults, setSearchResults] = useState([]);//массив найденных фильмов
    const [savedMovies, setSavedMovies] = useState([]);//массив с сохраненнными фильмами


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

    const handleSavedMovies = async (card) => {//сабмит
        //const isLiked = card.cardData.likes.some((id) => id === currentUser._id);
        setIsLoading(true)
        if (card.isLiked) {
            mainApi.deleteMovie(card.id)
                .then((newSavedMovie) => {
                    setSavedMovies((state) => state.map((c) => c.id === card.id ? newSavedMovie : c));
                    console.log("удаление")
                })
                .catch((e) => console.error(e?.reason || e?.message))
        } else {
            mainApi.savedMovie(card.id)
                .then((newSavedMovie) => {
                    setSavedMovies((state) => state.map((c) => (c.id === card.id ? newSavedMovie : c)));
                    setSavedMovies([newSavedMovie, ...savedMovies]);
                    console.log("сохранение")
                    setIsLoading(false);
                })
                .catch((e) => console.error(e?.reason || e?.message))
        }
    }
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
    }, [isLoggedIn]);
    //сохранение фильма в свое хранилище
    //   function handleCardLike(card) {
    //     const isLiked = card.cardData.likes.some((id) => id === currentUser._id);
    //     if (isLiked) {
    //       api.deleteLikeCardData(card.cardData._id)
    //         .then((newCard) => {
    //           setCards((state) => state.map((c) => c._id === card.cardData._id ? newCard : c));
    //         })
    //         .catch((e) => console.error(e?.reason || e?.message))
    //     } else {
    //       api.addLikeCardData(card.cardData._id)
    //         .then((newCard) => {
    //           setCards((state) => state.map((c) => (c._id === card.cardData._id ? newCard : c)));
    //         })
    //         .catch((e) => console.error(e?.reason || e?.message))
    //     }
    //   }


    return (
        <>
            <section className='saved-movies movies'>
                <SearchForm />
                {isLoading ? <Preloader /> : (
                    <MoviesCardList
                        onSavedMovies={handleSavedMovies}
                        movies={searchResults} />
                    // {/* <div className='saved-movies__gap'></div> */}
                )}
            </section >
        </>
    )
}
export default SavedMovies