import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';

function Movies() {
    
    return (
        <main>         
            <section className='movies'>
                <SearchForm />
                <MoviesCardList />                
            </section >
        </main>
    )
}
export default Movies