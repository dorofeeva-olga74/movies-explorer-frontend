import React, {useState} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';

function Movies({ handleMovieLikeToggle, isLoading, setIsLoading, isShortFilm, setIsShortFilm, onSubmit, 
    movies, searchInputValue, setSearchInputValue, savedMovies, setSavedMovies, getAllMovies, }) {
       // const [isSaved, setIsSaved] = useState(savedMovies.some((m) => m.movieId === movie.id));//состояние сохранения фильма - то есть ЛАЙК!!!
        // const handleSavedClick = useCallback((e) => { 
        //     e.preventDefault();         
        //     //console.log(movie);
        //     if(!isSaved) {
        //         onMovieLike(movie);
        //         console.log('like')
        //         setIsSaved(!isSaved);
        //     } else {
        //         onMovieDelete(movie);
        //         setIsSaved(false);
        //         console.log('deslike')  
        //     }
        // }, [movie, onMovieLike, onMovieDelete, isSaved])
    
        // const handleDelete = () => {
        //     onMovieDelete(movie);
        //     setIsSaved(isSaved);
        // }
    
        // const addFavoritMovie = (movie) => {
        //  const newFavoritList = [...savedMovies, movie]
        //  setSavedMovies(newFavoritList);
        // }


    return (
        <main className='main'>
            <section className='movies'>
                <SearchForm
                    setSearchInputValue={setSearchInputValue}
                    searchInputValue={searchInputValue}
                    setIsLoading={setIsLoading}
                    // onSubmit={onSubmit}
                    isShortFilm={isShortFilm}
                    setIsShortFilm={setIsShortFilm}  
                />
                {isLoading ? <Preloader /> : (
                    <MoviesCardList
                    isShortFilm={isShortFilm}
                        movies={movies}
                        searchInputValue={searchInputValue}
                        savedMovies={savedMovies}
                        setSavedMovies={setSavedMovies}                        
                        handleMovieLikeToggle={handleMovieLikeToggle}
                        getAllMovies={getAllMovies}
                        // handleFavoritClick={addFavoritMovie}                  
                    />
                )}
            </section >
        </main>
    )
}
export default Movies
