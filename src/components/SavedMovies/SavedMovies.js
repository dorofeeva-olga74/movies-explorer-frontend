import React, { useState, useEffect, useContext, useCallback } from "react";
// import CurrentUserContext from '../../contecst/CurrentUserContext.js';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';
import { mainApi } from "../../utils/MainApi";

function SavedMovies({ setSearchInputValue, onSubmit, isShortFilm, getAllLikedMovies, setSavedMovies, setIsShortFilm, 
    setFilteredMoviesList, isLoading, setIsLoading, searchInputValue, isLoggedIn, handleMovieLikeToggle, movies, savedMovies }) {
    
    console.log(movies)
    //получение сохраненных фильмов с сервера
    // const getSavedMovies = useCallback(async () => {
    //     setIsLoading(true);
    //     try {
    //         const apiSavedMovies = await mainApi.getSavedMovies();
    //         console.log(apiSavedMovies.data);
    //         setSavedMoviesList(apiSavedMovies.data);
    //         localStorage.setItem("allSavedMovies", JSON.stringify(apiSavedMovies.data));
    //     } catch (err) {
    //         console.log(err);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }, [])
    // const getAllLikedMovies = useCallback(async () => {
    //     setIsLoading(true);
    //     try {
    //       const allSavedMovies = await mainApi.getSavedMovies();
    //       setSavedMovies(allSavedMovies);
    //       localStorage.setItem("allSavedMovies", JSON.stringify(allSavedMovies));
    //     } catch (e) {
    //       console.error(e?.reason || e?.message);
    //     } finally {
    //       setIsLoading(false)
    //     }
    //   }, [setIsLoading, setSavedMovies]);
    
    //   // загрузка всех фильмов
    //   useEffect(() => {        
    //     getAllLikedMovies();
    //     localStorage.getItem("allSavedMovies", savedMovies);
    //   }, [getAllLikedMovies, savedMovies])

  

    return (
        <>
            <section className='saved-movies movies'>
                <SearchForm
                  setSearchInputValue={setSearchInputValue}
                  searchInputValue={searchInputValue}
                  setIsLoading={setIsLoading}
                  onSubmit={onSubmit}
                  isShortFilm={isShortFilm}
                  setIsShortFilm={setIsShortFilm} 
                />
                {isLoading ? <Preloader /> : (
                    <MoviesCardList
                    savedMovies={savedMovies}
                    searchInputValue={searchInputValue}
                        movies={movies}
                        handleMovieLikeToggle={handleMovieLikeToggle}
                        isShortFilm={isShortFilm}
                        setIsShortFilm={setIsShortFilm}
                        setFilteredMoviesList={setFilteredMoviesList}
                        getAllLikedMovies={getAllLikedMovies}
                    />
                    // {/* <div className='saved-movies__gap'></div> */}
                )}
            </section >
        </>
    )
}
export default SavedMovies