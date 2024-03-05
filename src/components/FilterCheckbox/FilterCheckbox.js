import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function FilterCheckbox({ isShortFilm, setIsShortFilm, isShortSavedFilm, setIsShortSavedFilm }) {
  const location = useLocation();
  const [currentIsShort, setCurrentIsShort] = useState(() => {
    return location.pathname === '/movies' ? isShortFilm : isShortSavedFilm;
  });

  const handleChange = () => {
    setCurrentIsShort(!currentIsShort);
    location.pathname === '/movies' ? setIsShortFilm(!isShortFilm) : setIsShortSavedFilm(!isShortSavedFilm);
  };

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setIsShortSavedFilm(false);
      setCurrentIsShort(false);
    }
  }, [location.pathname, setIsShortSavedFilm]);

  return (
    <section className='filter-check-box'>
      <label className={`switch ${currentIsShort ? 'on' : 'off'}`}>
        <input
          type='checkbox'
          onClick={handleChange}
          id='toggle'
          name='isShortFilm'
        />
        <span className='slider' />
      </label>
    </section>
  );
}
export default FilterCheckbox;
