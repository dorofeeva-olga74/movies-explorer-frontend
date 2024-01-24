import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';

function SavedMovies() {
    return (
        <>
            <section className='movies'>
                <SearchForm />
                <MoviesCardList />
                <div className='savedMovies-gap'></div>
            </section >
        </>
    )
}
export default SavedMovies