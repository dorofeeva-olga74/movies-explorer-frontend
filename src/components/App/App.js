import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi.js';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../contecst/CurrentUserContext.js';
import Header from '../Header/Header';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
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
// import { register, authorize, checkToken } from '../../utils/Auth.js';

function App() {  
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);//зарегистрирован пользователь или нет 
  const [isLoading, setIsLoading] = useState(false);//прелоадинг
  const [isUpdatedUser, setIsUpdatedUser] = useState(false);//состояние измениния данных пользователя
  const [movies, setMovies] = useState([]); // изначальный массив фильмов
  const [filteredMoviesList, setFilteredMoviesList] = useState([]); // массив отфильтрованных фильмов
  const [value, setValue] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);// сохраненные фильмы 
  const [isShortFilm, setIsShortFilm] = useState(() => {  // короткие фильмы
  const savedIsShort = localStorage.getItem('isShort');
    return savedIsShort === 'true'
    // return savedIsShort ? JSON.parse(savedIsShort) : { query: '', isShort: false };
  }); 
  // const [savedMovies, setSavedMovies] = useState([]);//массив с сохраненнными фильмами
  console.log(filteredMoviesList)
  const navigate = useNavigate();
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = useState(false);
  const [isInfoTooltipStatus, setIsInfoTooltipStatus] = useState(false);
  const [textErrorServer, setTextErrorServer] = useState(''); //текст ошибки над кнопкой сабмита
  // const [isValidServer, setIsValidServer] = useState(false); // состояние наличия ошибок от сервера
  console.log(currentUser)

  //ВЫХОД
  const handleExitUser = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentUser({
      name: '',
      email: '',
    })
    navigate('/');
  }
  ///РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ - САБМИТ
  async function handleRegisterSubmit(data) {
    try {
      const userDataAfterReg = await mainApi.register(data);
      setCurrentUser(userDataAfterReg)
      // setIsInfoTooltipStatus(true);     
      // setIsInfoTooltipOpened(true);
      handleLoginSubmit({ email: data.email, password: data.password })// логиним сразу пользователя
      setIsLoggedIn(true);      
    } catch (err) {
      if (err === 'Error: 409') {
        setTextErrorServer('Пользователь с таким email уже существует.');              
      } else {
        setTextErrorServer('При регистрации пользователя произошла ошибка.');             
      }
      // setIsInfoTooltipOpened(false);    
      // setIsInfoTooltipStatus(false);
    }
  }

  //АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ - САБМИТ
  const handleLoginSubmit = async (data) => {
    try {
      const response = await mainApi.authorize(data);
      console.log(response.token) // здесь есть токен
      localStorage.setItem('token', response.token); // сохраняем токен в хранилище
      setIsLoggedIn(true);
      navigate('/movies');
      // setIsInfoTooltipOpened(true);
      // setIsInfoTooltipStatus(true);     
    } catch (err) {
      // if (err) {
      setTextErrorServer('Вы ввели неправильный логин или пароль.');      
     // }
      // if (err === 'Error: INVALID_EMAIL_OR_PASSWORD') {
      // setTextErrorServer('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
      // setIsValidServer(true);         
      // }
      // else {
      //   setTextErrorServer('При авторизации произошла ошибка. Переданный токен некорректен.');
      // setIsValidServer(true);       
      // }     
      // setIsInfoTooltipOpened(true);
      // setIsInfoTooltipStatus(false);
    }
  }
  //ПРОВЕРКА ТОКЕНА
  // const handleAuth = (token) => {
  //   console.log(token)
  //   if (token) {
  //     mainApi.checkToken(token)
  //       .then((user) => {
  //         setIsLoggedIn(true);
  //         setCurrentUser(user)        
  //         .catch((e) => {
  //           console.error(e)
  //         });
  //       })
  //   }
  // }

  // useEffect(() => {
  //   handleAuth(localStorage.getItem('token'))
  // }, [])
  // ПРОВЕРКА ТОКЕНА
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      mainApi.checkToken(token)
        .then((user) => {          
          setCurrentUser({
            name: user.name,
            email: user.email,
          })
          setIsLoggedIn(true);
        })
        .catch((err) => console.log(err))
    } 
  }, []);  
   
  //получение информации о пользователе с сервера
  const getCurrentUser = async () => {
    try {
      const currentUser = await mainApi.getProfileInfo();
      setCurrentUser(currentUser);
      // setCurrentUser(await mainApi.getUserData());
    } catch (err) {
      console.log(err)
    }
  }
  //хук получения данных пользователя при входе
  useEffect(() => {
    if (isLoggedIn) {
      getCurrentUser();
    }
  }, [isLoggedIn])

  //изменение данных пользователя
  const handleUpdateUser = async (name, email) => {
    console.log(name, email); //сюда новые значения приходят    
    // if (isLoading) return;
    try {
      setIsLoading(true);
      setIsUpdatedUser(true)// состояние изменения данных пользователя
      const updatedUserData = await mainApi.changeUserData({
        name: name,
        email: email,
      })
      setIsInfoTooltipOpened(true);
      setIsInfoTooltipStatus(true);
      console.log(updatedUserData);
      setCurrentUser(updatedUserData);
    } catch (err) {
      // setIsInfoTooltipOpened(true);
      // setIsInfoTooltipStatus(false);
      if (err === 'Error: 409') {
        setTextErrorServer('Пользователь с таким email уже существует.');
      } else {
        setTextErrorServer('При обновлении профиля произошла ошибка.');
      }
      console.err(err?.reason || err?.message);
    } finally {
      setIsLoading(false)
      // setIsUpdatedUser(false);      
    }
  }

  //ФИЛЬМЫ/////////////////////////////////
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
  // console.log(movies); // -  здесь все 100 фильмов!!! 

  // сохранение состояния фильтра короткометражек
  useEffect(() => {
    localStorage.setItem('isShort', String(isShortFilm));
  }, [isShortFilm]);

  const allFilteredMovies = useMemo(() => {
    if (!value) {
      return [];
    }
    const filtredMovies = movies.filter((movie) => {
      if (isShortFilm && movie.duration > 40) {
        return false;
      }
      const nameRU = movie.nameRU.toLowerCase().includes(value.toLowerCase());
      const nameEN = movie.nameEN.toLowerCase().includes(value.toLowerCase());
      return nameRU || nameEN;
    });
    console.log(filtredMovies);
    localStorage.setItem('value', value);
    localStorage.setItem('isShortFilm', String(isShortFilm));
    localStorage.setItem('allFilteredMovies', JSON.stringify(filtredMovies));
    setFilteredMoviesList(filtredMovies);    
    return filtredMovies;
  }, [movies, isShortFilm, value]);

  // console.log(allFilteredMovies); // здесь отфильтрованные фильмы пока по имени

  const handleMovieDelete = async (movie) => {    
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
    console.log(movie) // приходит лайк
    //const isLiked = movie.id.some((m) => m.movieId === movie.id);
    try {
      // if (!movie.isLiked) {
      const newMovie = await mainApi.savedMovie(movie);
      console.log(newMovie)
      setSavedMovies([...savedMovies, newMovie]);
      //console.log(newMovie)            
      // } else {
      //     await handleMovieDelete(movie)
      // }
    } catch (e) {
      console.log(e);
    }
  }
  // загрузка всех фильмов
  useEffect(() => {
    getAllMovies();
  }, [getAllMovies])

  // Закрытие попапов
  function closeAllPopups() {
    //setIsCardDeletePopupOpen(false);
    // setSelectedCard({});
    setIsInfoTooltipStatus(false);
    setIsInfoTooltipOpened(false);
  }
  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className='app'>
        <Routes>
          <Route path='/' element={
            <>
              <Header isLoggedIn={isLoggedIn} handleExitUser={handleExitUser} />
              <Main isLoggedIn={isLoggedIn} handleExitUser={handleExitUser} />
              <Footer />
            </>
          } />
          <Route path='/about-project' element={
            <>
              <Header isLoggedIn={isLoggedIn} handleExitUser={handleExitUser} />
              <AboutProject />
              <Techs />
              <AboutMe />
              <Footer />
            </>
          } />
          <Route path='/movies' element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <>
                <Header isLoggedIn={isLoggedIn} handleExitUser={handleExitUser} />
                <Movies
                  isLoading={isLoading}
                  isLoggedIn={isLoggedIn}
                  setIsLoading={setIsLoading}
                  allFilteredMovies={allFilteredMovies}
                  onSubmit={allFilteredMovies}
                  value={value}
                  setValue={setValue}                  
                  isShortFilm={isShortFilm}
                  setIsShortFilm={setIsShortFilm}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                  onMovieLike={(movie) => handleMovieLike(movie)}
                  onMovieDelete={(movie) => handleMovieDelete(movie)}
                />
                <Footer />
              </>
            </ProtectedRoute>
          } />
          <Route path='/saved-movies' element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <>
                <Header isLoggedIn={isLoggedIn} handleExitUser={handleExitUser} />
                <SavedMovies
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  isLoggedIn={isLoggedIn}
                />
                <Footer />
              </>
            </ProtectedRoute>
          } />
          <Route path='/profile' element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <>
                <Header isLoggedIn={isLoggedIn} handleExitUser={handleExitUser} />
                <Profile
                  handleExitUser={handleExitUser}
                  isLoading={isUpdatedUser}
                  setIsLoading={setIsUpdatedUser}
                  onUpdateUser={handleUpdateUser}
                  textErrorServer={textErrorServer}
                />
              </>
            </ProtectedRoute>
          } />
          <Route path='/signup' element={<Register textErrorServer={textErrorServer} onSubmit={handleRegisterSubmit} />} />
          <Route path='/signin' element={<Login textErrorServer={textErrorServer} onSubmit={handleLoginSubmit} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <InfoTooltip
          isOpen={isInfoTooltipOpened}
          //onCloseOverlay={handleOverlayClick}
          onClose={closeAllPopups}
          status={isInfoTooltipStatus}
          text={isInfoTooltipStatus ? 'Результат успешен!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;




//отправка данных о сохраненных фильмах на сервер//сохранение фильма
  // const handleSavedMovies = async (data) => {//сабмит
  //   setIsLoading(true)
  //   try {
  //     const newSavedMovie = await mainApi.savedMovie(data);
  //     //console.log(await mainApi.saveMovie())
  //     //console.log(newMovie)
  //     setSavedMovies([newSavedMovie, ...savedMovies]);
  //     //setSavedMovies(newSavedMovie.data);     
  //     setIsLoading(false);
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // //загрузка всех фильмов 
  // useEffect(() => {
  //   //const token = localStorage.getItem('token');
  //   setIsLoading(true);
  //   if (isLoggedIn) { //token вместо isLoggedIn
  //     Promise.all([moviesApi.getMovies()])
  //       .then(([movies]) => {
  //         // setCurrentUser(userInfoAnswer);
  //         setMovies(movies);         
  //         localStorage.setItem('movies', JSON.stringify(moviesApi));
  //       })
  //       .catch((e) => {
  //         console.error(e?.reason || e?.message);
  //         localStorage.clear();
  //       })
  //       .finally(() => setIsLoading(false))
  //   }
  // }, [isLoggedIn]);

  //получение данных айди для удаления фильма 
  // function setSelectedCardIdToDeleteData(currentCardId) {
  //   setSelectedCardIdToDelete(currentCardId)
  // }  

  //Обработчик Escape
  // const isSomePopupOpen = isInfoTooltipOpened //|| isCardDeletePopupOpen 
  // useEffect(() => {
  //   function closeByEscape(e) {
  //     if (e.key === 'Escape') {
  //       closeAllPopups();
  //     }
  //   }
  //   if (isSomePopupOpen) { // навешиваем только при открытии
  //     document.addEventListener('keydown', closeByEscape);
  //     return () => {
  //       document.removeEventListener('keydown', closeByEscape);
  //     }
  //   }
  // }, [isSomePopupOpen])
