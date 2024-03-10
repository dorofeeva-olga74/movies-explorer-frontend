import React, { useEffect, useState } from 'react';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi.js';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../contecst/CurrentUserContext.js';
import Header from '../Header/Header';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
// import Preloader from '../Preloader/Preloader.js';
import { Profile } from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/login.js';
import NotFound from '../NotFound/NotFound.js';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import { register, authorize, checkToken, getProfileInfo, changeUserData } from '../../utils/Auth.js';

function App() {
  // const [isTokenChecked, setIsTokenChecked] = useState(false); // состояние, которое отслеживает, была ли проверка токена завершена
  const [currentUser, setCurrentUser] = useState({
    // пользователь
    name: '',
    email: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // состояние зарегистрированности пользователья
  const [isLoading, setIsLoading] = useState(false); // прелоадинг
  const [isUpdatedUser, setIsUpdatedUser] = useState(false); // состояние измениния данных пользователя

  const [movies, setMovies] = useState([]); // изначальный массив фильмов
  const [isShortFilm, setIsShortFilm] = useState(false); // короткие фильмы состояние
  const [isShortSavedFilm, setIsShortSavedFilm] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]); // массив с сохраненнными фильмами

  const [searchInputValue, setSearchInputValue] = useState(localStorage.getItem('searchInputValue') ?? ''); // значение поисковой строки на странице "Фильмы"
  const [searchSavedInputValue, setSearchSavedInputValue] = useState(
    // значение поисковой строки на странице "сохраненные фильмы"
    localStorage.getItem('searchSavedInputValue') ?? ''
  );
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = useState(false);
  const [isInfoTooltipStatus, setIsInfoTooltipStatus] = useState(false);
  const [isContextBurgerMenuOpened, setIsContextBurgerMenuOpened] = useState(false);

  const navigate = useNavigate();
  const [serverError, setServerError] = useState({
    // ошибка от сервера над кнопкой сабмита
    isValid: false,
    text: '',
  });
  ///// ПОЛЬЗОВАТЕЛИ ///////////////////////
  // РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ - САБМИТ
  const handleRegisterSubmit = async (data) => {
    try {
      setIsLoading(true);
      const userDataAfterReg = await register(data);
      setCurrentUser(userDataAfterReg);
      setIsInfoTooltipStatus(true);
      setIsInfoTooltipOpened(true);
      await handleLoginSubmit({ email: data.email, password: data.password }); // логиним сразу пользователя
      setIsLoggedIn(true);
      setServerError({ isValid: false, text: '' });
    } catch (err) {
      setServerError((prev) => ({ ...prev, isValid: true }));
      console.log(err);
      if (err.includes('409')) {
        setServerError((prev) => ({ ...prev, isValid: true, text: 'Пользователь с таким email уже существует.' }));
      } else {
        setServerError((prev) => ({ ...prev, isValid: true, text: 'При регистрации пользователя произошла ошибка.' }));
        // setIsInfoTooltipOpened(false);
        setIsInfoTooltipStatus(false);
        console.error(err?.reason || err?.message);
      }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ - САБМИТ
  const handleLoginSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await authorize(data);
      localStorage.setItem('token', response.token); // сохраняем токен в хранилище
      setIsLoggedIn(true);
      navigate('/movies');
      setIsInfoTooltipOpened(true);
      setIsInfoTooltipStatus(true);
      setServerError({ isValid: false, text: '' });
    } catch (err) {
      if (err.includes('401')) {
        setServerError((prev) => ({ ...prev, isValid: true, text: 'Вы ввели неправильный логин или пароль.' }));
      } else if (err.includes('403')) {
        setServerError((prev) => ({
          ...prev,
          isValid: true,
          text: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.',
        }));
      } else {
        setServerError((prev) => ({
          ...prev,
          isValid: true,
          text: 'При авторизации произошла ошибка. Пожалуйста, попробуйте еще раз.',
        }));
      }
      console.error(err?.reason || err?.message);
      // setIsInfoTooltipOpened(false);
      setIsInfoTooltipStatus(false);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // ПОЛУЧЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  const getCurrentUser = async () => {
    try {
      // получаю токен из localStorage
      const token = localStorage.getItem('token');
      const currentUser = await getProfileInfo(token);
      setCurrentUser(currentUser);
    } catch (err) {
      console.error(err?.reason || err?.message);
    }
  };

  // ИЗМЕНЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  const handleUpdateUser = async ({ name, email }) => {
    // Проверяю изменились ли данные
    if (name === currentUser.name && email === currentUser.email) {
      console.log('Данные не изменились.');
      setIsUpdatedUser(false);
      return;
    }
    try {
      setIsLoading(true);
      setIsUpdatedUser(true); // состояние изменения данных пользователя
      const updatedUserData = await changeUserData({ name, email });
      setIsInfoTooltipOpened(true);
      setIsInfoTooltipStatus(true);
      setServerError({ isValid: false, text: '' });
      setCurrentUser(updatedUserData); //  Обновляю данные пользователя в приложении
    } catch (err) {
      if (err.includes('409')) {
        setServerError((prev) => ({
          ...prev,
          isValid: true,
          text: 'Пользователь с таким email уже существует.',
        }));
      } else {
        setServerError((prev) => ({ ...prev, isValid: true, text: 'При обновлении профиля произошла ошибка.' }));
      }
      console.error(err?.reason || err?.message);
      // setIsInfoTooltipOpened(true);
      setIsInfoTooltipStatus(false);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  ///// ФИЛЬМЫ ///////////////////////
  const prepearingCard = (movie) => {
    const newCard = JSON.parse(JSON.stringify(movie));
    newCard.country = movie.country || '';
    newCard.director = movie.director || '';
    newCard.duration = movie.duration || '';
    newCard.year = movie.year || '';
    newCard.description = movie.description || '';
    newCard.image = `https://api.nomoreparties.co${movie.image.url}` || '';
    newCard.trailerLink = movie.trailerLink || '';
    newCard.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}` || '';
    newCard.movieId = movie.id;
    newCard.nameRU = movie.nameRU || '';
    newCard.nameEN = movie.nameEN || '';
    delete newCard.id;
    delete newCard.created_at;
    delete newCard.updated_at;
    return newCard;
  };

  // ПОЛУЧЕНИЕ ВСЕХ ФИЛЬМОВ
  const getAllMovies = async () => {
    setIsLoading(true);
    try {
      const arrayWithNewCards = await moviesApi.getMovies();
      localStorage.setItem('allMovies', JSON.stringify(arrayWithNewCards));
      setMovies(arrayWithNewCards.map((movie) => prepearingCard(movie)));
      setServerError({ isValid: false, text: '' });
    } catch (e) {
      setServerError((prev) => ({
        ...prev,
        isValid: true,
        text: '«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз».',
      }));
      console.error(e?.reason || e?.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  // ПОЛУЧЕНИЕ СОХРАНЕННЫХ ФИЛЬМОВ
  const getAllLikedMovies = async () => {
    setIsLoading(true);
    try {
      const allSavedMovies = await mainApi.getSavedMovies();
      if (allSavedMovies && allSavedMovies.length > 0) {
        setSavedMovies(allSavedMovies);
      } else {
        console.log('Нет сохраненных фильмов');
      }
    } catch (e) {
      console.error(e?.reason || e?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // СОХРАНЕНИЕ ФИЛЬМОВ В ИЗБРАННЫЕ, управление кнопкой лайка
  const handleMovieLikeToggle = (movie) => {
    const savedMovieIndex = savedMovies.findIndex((m) => m.movieId === movie.movieId);
    const savedMovieId = savedMovies[savedMovieIndex]?._id;
    savedMovieIndex === -1
      ? mainApi
          .savedMovie(movie)
          .then((res) => {
            setSavedMovies((prev) => prev.concat(res));
          })
          .catch((e) => {
            console.error(e?.reason || e?.message);
          })
      : mainApi
          .deleteMovie(savedMovieId)
          .then(() => {
            setSavedMovies((prev) => prev.filter((obj) => obj.movieId !== movie.movieId));
          })
          .catch((e) => {
            console.error(e?.reason || e?.message);
          });
  };

  // ВЫХОД
  const handleExitUser = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    setCurrentUser((prev) => ({
      ...prev,
      name: '',
      email: '',
    }));
    setSavedMovies([]); // Очищаю локальное состояние сохраненных фильмов
    localStorage.removeItem('token');
    localStorage.removeItem('isShortFilm');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('allSavedMovies');
    localStorage.removeItem('searchInputValue');
    localStorage.removeItem('searchSavedInputValue');
    localStorage.removeItem('allFilteredMovies'); // Очищаю локальное хранилище все отфильтрованных фильмов
    navigate('/');
  };
  // ОБРАБОТЧИК Escape
  const isSomePopupOpen = isInfoTooltipOpened || isContextBurgerMenuOpened;

  // ЗАКРЫТИЕ ПОПАПОВ
  const closeAllPopups = () => {
    setIsContextBurgerMenuOpened(false);
    setIsInfoTooltipStatus(false);
    setIsInfoTooltipOpened(false);
  };
  // ЗАКРЫТИЕ ПО ОВЕРЛЕЮ
  const handleOverlayClick = (e) => {
    if (e.target?.className?.includes('context-burger-menu') || e.target?.className?.includes('popup')) {
      closeAllPopups();
    }
  };
  // ЗАКРЫТИЕ ПО 'Escape'
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };
    if (isSomePopupOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isSomePopupOpen]);

  useEffect(() => {
    localStorage.setItem('isShortFilm', String(isShortFilm));
  }, [isShortFilm]);

  // ПОЛУЧЕНИЕ данных пользователя при входе, загрузка всех фильмов и загрузка сохраненных фильмов
  useEffect(() => {
    if (!localStorage.getItem('token')) return;
    getCurrentUser();
    getAllMovies();
    getAllLikedMovies();
    localStorage.getItem('allMovies', movies);
    localStorage.getItem('allSavedMovies', savedMovies);
    localStorage.getItem('isShortFilm', isShortFilm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  // ПРОВЕРКА ТОКЕНА
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token)
        .then((user) => {
          setCurrentUser({
            name: user.name,
            email: user.email,
          });
          setIsLoggedIn(true);
        })
        .catch((err) => console.log(err));
      //     .finally(() => {
      //       setIsTokenChecked(true);
      //     });
      // } else {
      //   setIsTokenChecked(true);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className='app'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Header
                  isOpen={isContextBurgerMenuOpened}
                  setIsContextBurgerMenuOpened={setIsContextBurgerMenuOpened}
                  onClose={closeAllPopups}
                  onCloseOverlay={handleOverlayClick}
                  isLoggedIn={isLoggedIn}
                />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path='/about-project'
            element={
              <>
                <Header
                  isOpen={isContextBurgerMenuOpened}
                  setIsContextBurgerMenuOpened={setIsContextBurgerMenuOpened}
                  onClose={closeAllPopups}
                  onCloseOverlay={handleOverlayClick}
                  isLoggedIn={isLoggedIn}
                />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Footer />
              </>
            }
          />
          <Route
            path='/movies'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <Header
                    isOpen={isContextBurgerMenuOpened}
                    setIsContextBurgerMenuOpened={setIsContextBurgerMenuOpened}
                    onClose={closeAllPopups}
                    onCloseOverlay={handleOverlayClick}
                    isLoggedIn={isLoggedIn}
                  />
                  <Movies
                    serverError={serverError}
                    setSearchInputValue={setSearchInputValue}
                    searchInputValue={searchInputValue}
                    setIsLoading={setIsLoading}
                    isShortFilm={isShortFilm}
                    setIsShortFilm={setIsShortFilm}
                    isLoading={isLoading}
                    handleMovieLikeToggle={handleMovieLikeToggle}
                    movies={movies}
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                  />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <Header
                    isOpen={isContextBurgerMenuOpened}
                    setIsContextBurgerMenuOpened={setIsContextBurgerMenuOpened}
                    onClose={closeAllPopups}
                    onCloseOverlay={handleOverlayClick}
                    isLoggedIn={isLoggedIn}
                  />
                  <SavedMovies
                    isShortSavedFilm={isShortSavedFilm}
                    setIsShortSavedFilm={setIsShortSavedFilm}
                    setSearchInputValue={setSearchSavedInputValue}
                    searchInputValue={searchSavedInputValue}
                    serverError={serverError}
                    setIsLoading={setIsLoading}
                    isShortFilm={isShortFilm}
                    setIsShortFilm={setIsShortFilm}
                    isLoading={isLoading}
                    handleMovieLikeToggle={handleMovieLikeToggle}
                    movies={savedMovies}
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                  />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <Header
                    isOpen={isContextBurgerMenuOpened}
                    setIsContextBurgerMenuOpened={setIsContextBurgerMenuOpened}
                    onClose={closeAllPopups}
                    onCloseOverlay={handleOverlayClick}
                    isLoggedIn={isLoggedIn}
                  />
                  <Profile
                    setServerError={setServerError}
                    serverError={serverError}
                    handleExitUser={handleExitUser}
                    isUpdatedUser={isUpdatedUser}
                    setIsUpdatedUser={setIsUpdatedUser}
                    onUpdateUser={handleUpdateUser}
                  />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path='/signup'
            element={
              <Register
                setServerError={setServerError}
                serverError={serverError}
                onSubmit={handleRegisterSubmit}
              />
            }
          />
          <Route
            path='/signin'
            element={
              <Login
                setServerError={setServerError}
                serverError={serverError}
                onSubmit={handleLoginSubmit}
              />
            }
          />
          <Route
            path='*'
            element={<NotFound />}
          />
        </Routes>
        <InfoTooltip
          isOpen={isInfoTooltipOpened}
          onCloseOverlay={handleOverlayClick}
          onClose={closeAllPopups}
          status={isInfoTooltipStatus}
          text={isInfoTooltipStatus ? 'Результат успешен!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;

//   return !isTokenChecked ? (
//     <Preloader /> // Компонент загрузки
//   ) : (
//     <CurrentUserContext.Provider value={{ currentUser }}>
//       <div className='app'>
//         <Routes>
//           <Route
//             path='/'
//             element={
//               <>
//                 <Header
//                   isOpen={isContextBurgerMenuOpened}
//                   setIsContextBurgerMenuOpened={setIsContextBurgerMenuOpened}
//                   onClose={closeAllPopups}
//                   onCloseOverlay={handleOverlayClick}
//                   isLoggedIn={isLoggedIn}
//                 />
//                 <Main />
//                 <Footer />
//               </>
//             }
//           />
//           <Route
//             path='/about-project'
//             element={
//               <>
//                 <Header
//                   isOpen={isContextBurgerMenuOpened}
//                   setIsContextBurgerMenuOpened={setIsContextBurgerMenuOpened}
//                   onClose={closeAllPopups}
//                   onCloseOverlay={handleOverlayClick}
//                   isLoggedIn={isLoggedIn}
//                 />
//                 <AboutProject />
//                 <Techs />
//                 <AboutMe />
//                 <Footer />
//               </>
//             }
//           />
//           <Route
//             path='/movies'
//             element={
//               <ProtectedRoute isLoggedIn={isLoggedIn}>
//                 <>
//                   <Header
//                     isOpen={isContextBurgerMenuOpened}
//                     setIsContextBurgerMenuOpened={setIsContextBurgerMenuOpened}
//                     onClose={closeAllPopups}
//                     onCloseOverlay={handleOverlayClick}
//                     isLoggedIn={isLoggedIn}
//                   />
//                   <Movies
//                     serverError={serverError}
//                     setSearchInputValue={setSearchInputValue}
//                     searchInputValue={searchInputValue}
//                     setIsLoading={setIsLoading}
//                     isShortFilm={isShortFilm}
//                     setIsShortFilm={setIsShortFilm}
//                     isLoading={isLoading}
//                     handleMovieLikeToggle={handleMovieLikeToggle}
//                     movies={movies}
//                     savedMovies={savedMovies}
//                     setSavedMovies={setSavedMovies}
//                   />
//                   <Footer />
//                 </>
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path='/saved-movies'
//             element={
//               <ProtectedRoute isLoggedIn={isLoggedIn}>
//                 <>
//                   <Header
//                     isOpen={isContextBurgerMenuOpened}
//                     setIsContextBurgerMenuOpened={setIsContextBurgerMenuOpened}
//                     onClose={closeAllPopups}
//                     onCloseOverlay={handleOverlayClick}
//                     isLoggedIn={isLoggedIn}
//                   />
//                   <SavedMovies
//                     isShortSavedFilm={isShortSavedFilm}
//                     setIsShortSavedFilm={setIsShortSavedFilm}
//                     setSearchInputValue={setSearchSavedInputValue}
//                     searchInputValue={searchSavedInputValue}
//                     serverError={serverError}
//                     setIsLoading={setIsLoading}
//                     isShortFilm={isShortFilm}
//                     setIsShortFilm={setIsShortFilm}
//                     isLoading={isLoading}
//                     handleMovieLikeToggle={handleMovieLikeToggle}
//                     movies={savedMovies}
//                     savedMovies={savedMovies}
//                     setSavedMovies={setSavedMovies}
//                   />
//                   <Footer />
//                 </>
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path='/profile'
//             element={
//               <ProtectedRoute isLoggedIn={isLoggedIn}>
//                 <>
//                   <Header
//                     isOpen={isContextBurgerMenuOpened}
//                     setIsContextBurgerMenuOpened={setIsContextBurgerMenuOpened}
//                     onClose={closeAllPopups}
//                     onCloseOverlay={handleOverlayClick}
//                     isLoggedIn={isLoggedIn}
//                   />
//                   <Profile
//                     setServerError={setServerError}
//                     serverError={serverError}
//                     handleExitUser={handleExitUser}
//                     isUpdatedUser={isUpdatedUser}
//                     setIsUpdatedUser={setIsUpdatedUser}
//                     onUpdateUser={handleUpdateUser}
//                   />
//                 </>
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path='/signup'
//             element={
//               isLoggedIn ? (
//                 <Navigate
//                   replace
//                   to='/'
//                 />
//               ) : (
//                 <Register
//                   setServerError={setServerError}
//                   serverError={serverError}
//                   onSubmit={handleRegisterSubmit}
//                 />
//               )
//             }
//           />
//           <Route
//             path='/signin'
//             element={
//               isLoggedIn ? (
//                 <Navigate
//                   replace
//                   to='/'
//                 />
//               ) : (
//                 <Login
//                   setServerError={setServerError}
//                   serverError={serverError}
//                   onSubmit={handleLoginSubmit}
//                 />
//               )
//             }
//           />
//           <Route
//             path='*'
//             element={<NotFound />}
//           />
//         </Routes>
//         <InfoTooltip
//           isOpen={isInfoTooltipOpened}
//           onCloseOverlay={handleOverlayClick}
//           onClose={closeAllPopups}
//           status={isInfoTooltipStatus}
//           text={isInfoTooltipStatus ? 'Результат успешен!' : serverError.text}
//         />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }
// export default App;
