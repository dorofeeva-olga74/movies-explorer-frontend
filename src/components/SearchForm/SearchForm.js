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
}) {
  const location = useLocation();

  const [error, setError] = useState('');
  const [moviesSearchInput, setMoviesSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      location.pathname === '/movies' && localStorage.setItem('searchInputValue', moviesSearchInput);
      setSearchInputValue(moviesSearchInput);
      localStorage.setItem('isShortFilm', isShortFilm);
      setError('');
    } catch (e) {
      console.error(e?.reason || e?.message);
      setIsLoading(false);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    location.pathname === '/movies'
      ? setMoviesSearchInput(localStorage.getItem('searchInputValue') || '')
      : setMoviesSearchInput('');
    return () => {
      setMoviesSearchInput('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (searchInputValue === '') {
      setError('Нужно ввести ключевое слово');
    }
  }, [searchInputValue]);

  // useEffect(() => {
  //   // установить состояние фильтра из localStorage при монтировании компонента
  //   const savedIsShortFilm = localStorage.getItem('isShortFilm');
  //   savedIsShortFilm && setIsShortFilm(savedIsShortFilm === 'false'); // преобразовать строку в булево значение
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []); // пустой массив зависимостей, чтобы хук сработал только один раз

  const handleMoviesInput = (e) => {
    setMoviesSearchInput(e.target.value);
  };

  return (
    <section className='search'>
      <form
        className='search__form'
        onSubmit={(e) => handleSearchSubmit(e)}>
        <div className='search__input-container'>
          <input
            required
            id='search-input'
            className='search__input'
            value={moviesSearchInput}
            type='text'
            name='query'
            placeholder='Фильм'
            onChange={(e) => handleMoviesInput(e)}
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

// import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
// import Find from '../../images/Find.svg';
// import { useState, useEffect, useCallback } from 'react';
// import { useLocation } from 'react-router-dom';

// function SearchForm({ setSearchInputValue, searchInputValue, setIsLoading, isShortFilm, setIsShortFilm }) {
//   const location = useLocation();

//   const [error, setError] = useState('');
//   const [inputValue, setInputValue] = useState(''); // новое состояние для хранения значения поля поиска

//   const handleSearchSubmit = useCallback((e) => {
//       e.preventDefault();
//     try {
//       setIsLoading(true);
//       if (location.pathname === '/movies') {
//         localStorage.setItem('searchInputValue', inputValue);
//         // localStorage.setItem('searchInputValue', searchInputValue);
//         localStorage.setItem('isShortFilm', isShortFilm);
//       }
//       localStorage.setItem('isShortFilm', isShortFilm);
//       setError('');
//     } catch (e) {
//       console.error(e?.reason || e?.message);
//       setIsLoading(false);
//     } finally {
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 2000);
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   },[location.pathname, inputValue, isShortFilm]
//   );

//   useEffect(() => {
//     location.pathname === '/movies'
//       ? setInputValue(localStorage.getItem('searchInputValue') || '')
//       : setInputValue('');
//     return () => {
//       setInputValue('');
//     };
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location.pathname]);

//   useEffect(() => {
//     if (inputValue === '') {
//       setError('Нужно ввести ключевое слово');
//     }
//   }, [inputValue]);

//   return (
//     <section className='search'>
//       <form
//         className='search__form'
//         onSubmit={(e) => handleSearchSubmit(e)}>
//         <div className='search__input-container'>
//           <input
//             required
//             id='search-input'
//             className='search__input'
//             value={inputValue}
//             type='text'
//             name='query'
//             placeholder='Фильм'
//             onChange={(e) => setInputValue(e.target.value)}
//           />
//           <button
//             className='search__button'
//             type='submit'
//             aria-label='Найти'>
//             <img
//               className='search__img'
//               src={Find}
//               alt='Поиск'
//             />
//           </button>
//         </div>
//         <span className='search__error'>{error}</span>
//         <span className='search__filter-checkbox-conteiner'>
//           <FilterCheckbox
//             isShortFilm={isShortFilm}
//             setIsShortFilm={setIsShortFilm}
//           />
//           <p className='search__label'>Короткометражки</p>
//         </span>
//       </form>
//     </section>
//   );
// }
// export default SearchForm;
