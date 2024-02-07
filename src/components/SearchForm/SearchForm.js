// import { useState } from "react";
// import React, { useMemo, useState, useEffect, useCallback } from "react";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Find from '../../images/Find.svg';
import { useState } from 'react';
// import { MoviesApi } from '../../utils/MoviesApi';

function SearchForm({setValue, value, setIsLoading}) {
const [searchInput, setSearchInput] = useState(localStorage.getItem("searchInputValue") || '')

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        localStorage.setItem('searchInputValue', value)
        setValue(searchInput)
        try {                 
            setIsLoading(false);
            //console.log(value);
        } catch (e) {
            console.log(e)
        }
    }   


    return (
        <>
            <section className='search'>
                <form className='search__form' onSubmit={handleSearchSubmit}>
                    <div className='search__input-container'>
                        <input required id={'search-input'}
                            className='search__input'
                            value={searchInput}
                            type={'text'}
                            name='query'
                            placeholder={'Фильм'} 
                            onChange={(e) => setSearchInput(e.target.value)}                                                      
                        />
                        <button className='search__button' type='submit' aria-label={'Найти'}
                        //{/* onClick={() => getMovies(searchTerm)} */}
                        >
                            <img className='search__img' src={Find} alt='Поиск' />
                        </button>
                    </div>
                    <span className='search__filter-checkbox-conteiner'>
                        <FilterCheckbox />
                        <p className='search__label'>Короткометражки</p>
                    </span>                    
                </form>
            </section >
        </>
    )
}
export default SearchForm