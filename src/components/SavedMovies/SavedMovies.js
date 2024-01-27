import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';

function SavedMovies() {
    return (
        <>
            <section className='saved-movies movies'>
                <SearchForm />
                <MoviesCardList />
                {/* <div className='saved-movies__gap'></div> */}
            </section >
        </>
    )
}
export default SavedMovies