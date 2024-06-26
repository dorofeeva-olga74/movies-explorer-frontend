import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Find from '../../images/Find.svg';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SearchForm({
  setSearchInputValue,
  searchInputValue,
  setIsLoading,
  isShortFilm,
  setIsShortFilm,
  isShortSavedFilm,
  setIsShortSavedFilm,
  savedMovies,
  setSavedMovies,
}) {
  const location = useLocation();
  const [error, setError] = useState('');  
  const [localeInput, setLocaleInput] = useState(searchInputValue);
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);     
      if (location.pathname === '/movies') {
        localStorage.setItem('searchInputValue', localeInput); // записывается в локальное хранилище данные текущего инпута - на странице "Фильмы"
      } else {
        localStorage.setItem('searchSavedInputValue', localeInput);// записывается в локальное хранилище данные текущего инпута - на странице "Сохраненные фильмы"
      }
      setSearchInputValue(localeInput);      
      if (savedMovies.length === 0 && location.pathname === '/saved-movies') {
          setError('У Вас нет сохраненных фильмов. Перейдите на страницу "Фильмы" и сохраните, понравившийся фильм.');
        } else {
          if (!localeInput) {
             setError('Введите ключевое слово');
          } else {
          setError('');
        }       
      }              
    } catch (e) {
      console.error(e?.reason || e?.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }    
  };

  useEffect(() => {
    location.pathname === '/saved-movies' && !searchInputValue
      ? setSearchInputValue(localStorage.getItem('searchSavedInputValue') || '')
      : setSearchInputValue('') && setSavedMovies(localStorage.getItem('allSavedMovies', savedMovies));
    return () => {
      setSearchInputValue('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    location.pathname === '/movies'
      ? setSearchInputValue(localStorage.getItem('searchInputValue') || '')
      : setSearchInputValue('') && setSavedMovies(localStorage.getItem('allSavedMovies', savedMovies));
    return () => {
      setSearchInputValue('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  
  // обработать изменение значения input
  const handleInputChange = (e) => {
    setLocaleInput(e.target.value);
  };

  useEffect(() => {
    setLocaleInput(searchInputValue);
  }, [searchInputValue]);

  return (
    <section className='search'>
      <form
        noValidate
        className='search__form'
        onSubmit={(e) => handleSearchSubmit(e)}>
        <div className='search__input-container'>
          <input
            required
            id='search-input'
            className='search__input'
            value={localeInput}
            type='text'
            name='query'
            placeholder='Фильм'
            onChange={(e) => handleInputChange(e)}
          />
          <button
            className='search__button'
            type='submit'
            aria-label='Найти'>
            <img
              className='search__img'
              src={Find}
              alt='Поиск'
            />
          </button>
        </div>
        <span className='search__error'>{error}</span>
        <span className='search__filter-checkbox-conteiner'>
          <FilterCheckbox
            handleSearchSubmit={handleSearchSubmit}
            isShortFilm={isShortFilm}
            setIsShortFilm={setIsShortFilm}
            isShortSavedFilm={isShortSavedFilm}
            setIsShortSavedFilm={setIsShortSavedFilm}
          />
          <p className='search__label'>Короткометражки</p>
        </span>
      </form>
    </section>
  );
}
export default SearchForm;
