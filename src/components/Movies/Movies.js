import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi.js';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';

function Movies({ isLoading, setIsLoading,}) {

    const [movies, setMovies] = useState([]);
    const [value, setValue] = useState('');
    const [savedMovies, setSavedMovies] = useState([]);// сохраненные фильмы  
    //const [searchMovies, setSearchMovies] = useState([]);//состояние строки поиска//найденные фильмы 

    const getAllMovies = useCallback(async () => {
        setIsLoading(true);
        try {
            setMovies(await moviesApi.getMovies());
        } catch (e) {
            console.error(e?.reason || e?.message);
        } finally {
            setIsLoading(false)
        }
    }, [setIsLoading]);
    console.log(movies);

    const allFilteredMovies = useMemo(() => {
        const filtedMovies = movies.filter(movie => {
            if (!value) {
                return [];
            }
            const nameRU = movie.nameRU.toLowerCase().includes(value.toLowerCase());
            const nameEN = movie.nameEN.toLowerCase().includes(value.toLowerCase());

            return nameRU || nameEN;
        })

        localStorage.setItem("filtedMovies", filtedMovies);
        
        return filtedMovies
    }, [value, movies]);

    const handleMovieDelete = async (movie) => {
        //e.preventDefault();  
        setIsLoading(true);
        try {     
            const movieToDelete = savedMovies.find((m) => m.movieId === movie.id) 
            console.log(movieToDelete.id)  
            await mainApi.deleteMovie(movieToDelete);
            setMovies((state) => state.filter((m) => m.movieId === movie.id ? '' : m.movieId));
            console.log("удалила")
        } catch (e) {
            console.error(e?.reason || e?.message)
        }
    }

   const handleMovieLike = async (movie) => {     
    console.log(movie)
    //const isLiked = movie.id.some((m) => m.movieId === movie.id);
    try {
       // if (!movie.isLiked) {
            const newMovie = await mainApi.savedMovie(movie);                    
            console.log(newMovie)
            setSavedMovies([ ...savedMovies, newMovie]);
            //console.log(newMovie)            
       // } else {
       //     await handleMovieDelete(movie)
       // }
    } catch (e) {
        console.log(e);
    }
}
useEffect(() => {
    getAllMovies();
}, [getAllMovies])

    return (
        <main>
            <section className='movies'>
                <SearchForm
                    setValue={setValue}
                    value={value}
                    setIsLoading={setIsLoading}
                />
                {isLoading ? <Preloader /> : (
                    <MoviesCardList
                        allFilteredMovies={allFilteredMovies}
                        value={value}
                        savedMovies={savedMovies}
                        setSavedMovies={setSavedMovies}
                        onMovieLike={(movie)=>handleMovieLike(movie)}
                        onMovieDelete={(movie)=>handleMovieDelete(movie)}                  
                    />
                )}
            </section >
        </main>
    )
}
export default Movies

 ////////     
    //добавление фильма в сохраненные
    // const handleSaveMovie = useCallback(
    //     (card) => {
    //         const token = localStorage.getItem('jwt')
    //         return savedMovies(card, token)
    //             .then((newCard) => {
    //                 setSavedMovies((prev) => [newCard, ...prev], (card.saved = true))
    //                 console.log([newCard, ...savedMovies])
    //             })
    //             .catch((e) => {
    //                 console.error(e?.reason || e?.message);
    //                 localStorage.clear();
    //             })
    //     }, [savedMovies])
    
    // const handleSaveMovie = (id, disabled) => {
    //     //const token = localStorage.getItem('jwt')
    //     if ( disabled ) { 
    //                 return; 
    //             }
    //     setMovies(
    //         movies.map((item) =>
    //         item.id === id ? { ...item, liked: !item.liked } : item
    //       )

    //     );
    //     setIsSaved(!isSaved); 
    //     console.log('сохранить'); 
    //   };
    // const handleSaveMovie = (e, disabled) => {
    //     e.preventDefault();
    //     //const token = localStorage.getItem('jwt')
    //     if ( disabled ) { 
    //         return; 
    //     }
    //     setIsSaved(!isSaved);       
    //     console.log('сохранить'); 
    // }


//  const handleMovieLike = (e, movie) => {
//     console.log(movie)
//         e.preventDefault();        
//         let currentSavedCards = savedMovies;
//         //console.log(currentSavedCards)
//         if (!isSaved) {
//             setIsSaved(true);
//             if (!currentSavedCards.includes(movie.id))
//                 setSavedMovies(
//                     [...currentSavedCards, movie.id]
//                 );
//         } else {
//             setIsSaved(false);
//             if (currentSavedCards.includes(movie.id))
//                 setSavedMovies(
//                     currentSavedCards
//                         .filter(card => movie !== movie.id)
//                 );

//         }
//         console.log(currentSavedCards)
//      };

    // const handleMovieLike = (movie) => { 
    //     console.log(movie);
    //     const isLiked = movie.id.some((m) => m.movieId === movie.id);
    //     console.log(movie);
    //     //const isLiked = setSavedMovies.some((id) =>id === movie.id)
    //     if (isLiked) {
    //         handleMovieDelete(movie)
    //             .then((newMovie) => {
    //                 setMovies((state) => state.map((m) => m._id === movie.id ? newMovie : m));
    //             })
    //             .catch((e) => console.error(e?.reason || e?.message))
    //     } else {
    //         handleAdSaveMovie(movie)
    //             .then((newMovie) => {
    //                 setMovies((state) => state.map((m) => (m._id === movie.id ? newMovie : m)));
    //             })
    //             .catch((e) => console.error(e?.reason || e?.message))
    //     }
    // }


    // const handleSearchSubmit = async (e) => {
    //     setIsLoading(true)
    //     try {
    //         e.preventDefault();
    //         setSearchMovies({ query: setValue });
    //        // setIsLoading(false);
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }