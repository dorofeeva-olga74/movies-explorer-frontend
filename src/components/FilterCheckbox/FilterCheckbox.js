import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function FilterCheckbox({ handleSearchSubmit, isShortFilm, setIsShortFilm, isShortSavedFilm, setIsShortSavedFilm }) {
  const location = useLocation();
  const [currentIsShort, setCurrentIsShort] = useState(() => {
    return location.pathname === '/movies' ? isShortFilm === true : isShortSavedFilm === true;
  });

  const handleChange = (e) => {
    handleSearchSubmit(e);// добавила сабмит, что бы при переключении чекбокса выполнялся новый поиск фильма
    const newIsShort = !currentIsShort;
    setCurrentIsShort(newIsShort);
    location.pathname === '/movies' ? setIsShortFilm(newIsShort) : setIsShortSavedFilm(newIsShort);
  }; 

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setIsShortSavedFilm(false);
      setCurrentIsShort(false);
    } 
    else {
      // Получаю сохраненное значение из localStorage и преобразую его в boolean
      const savedIsShortFilm = JSON.parse(localStorage.getItem('isShortFilm'));
      // Если в localStorage есть значение, устанавливаю его, иначе устанавливаем false
      setCurrentIsShort((savedIsShortFilm) || false);      
    }
  }, [location.pathname, setIsShortSavedFilm, setCurrentIsShort]);

  return (
    <section className='filter-check-box'>
      <label className={`switch ${currentIsShort ? 'on' : 'off'}`}>
        <input
          checked={currentIsShort} // Управляемый компонент должен иметь свойство checked
          type='checkbox'
          onChange={handleChange}          
          id='toggle'
          name='isShortFilm'
        />
        <span className='slider' />
      </label>
    </section>
  );
}
export default FilterCheckbox;
