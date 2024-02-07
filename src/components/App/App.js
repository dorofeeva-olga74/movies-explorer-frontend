import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../contecst/CurrentUserContext.js';
import Header from '../Header/Header';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
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

import { mainApi } from "../../utils/MainApi";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: 'Olga',
    email: 'Olga@mail.ru',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);//зарегистрирован пользователь или нет 
  const [isLoading, setIsLoading] = useState(false);//прелоадинг
  const [isLoadingUpdateUser, setIsLoadingUpdateUser] = useState(false);//состояние измениния данных пользователя
  //const [userEmail, setUserEmail] = useState("");
  //const [userName, setUserName] = useState("");
  //const [movies, setMovies] = useState([]);//массив с фильмами пустой изначально
  //const [isMoviesLoading, setIsMoviesLoading] = useState(false); 
  // const [savedMovies, setSavedMovies] = useState([]);//массив с сохраненнными фильмами
  const navigate = useNavigate();
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = useState(false);
  const [isInfoTooltipStatus, setIsInfoTooltipStatus] = useState(false);
  // const [userEmail, setUserEmail] = useState("");

  // const currentMyUser = useContext(CurrentUserContext);
  // console.log(currentMyUser)
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
  const handleRegisterSubmit = async (data) => {
    try {
      await mainApi.register(data);
      setIsInfoTooltipStatus(true);
    } catch (err) {
      setIsInfoTooltipStatus(false);
    } finally {
      setIsInfoTooltipOpened(true);
    }
  }
  //АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ - САБМИТ
  const handleLoginSubmit = async (data) => {
    try {
      const { token } = await mainApi.authorize(data);
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      console.log(err);
      setIsInfoTooltipOpened(true);
      setIsInfoTooltipStatus(false);
    }
  }
  //ПРОВЕРКА ТОКЕНА
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.checkToken(token)
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser(data);          
        })
        .catch((err) => console.error(err?.reason || err?.message));
    }
  }, [])
  //получение информации  с сервера о фильмах и пользователе
  // useEffect(() => {
  //   if (!isLoggedIn) return;
  //     Promise.all([mainApi.getUserData(), moviesApi.getMovies()])
  //       .then(([userDataAnswer, moviesAnswer]) => {
  //         setCurrentUser(userDataAnswer);
  //         setMovies(moviesAnswer);
  //         setIsMoviesLoading(true);
  //       })
  //       .catch((e) => console.error(e?.reason || e?.message));       

  // }, [isLoggedIn]);
  //получение информации о пользователе с сервера
  // const getCurrentUserData = async () => {
  //   try {
  //     //const currentUserData = await mainApi.getUserData();
  //     setCurrentUser(await mainApi.getUserData());
  //   } catch (err) {
  //     console.error(err?.reason || err?.message)
  //   }
  // }
  // //хук получения данных юзера при входе
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     getCurrentUserData();
  //   }
  // }, [isLoggedIn])
  //изменение данных пользователя
  const handleUpdateUser = async (name, email) => {
    try {
      setIsLoadingUpdateUser(true)
      const updatedUserData = await mainApi.changeUserData({
        name: name,
        email: email,
      })
      console.log(updatedUserData);
      setCurrentUser(updatedUserData);
    } catch (err) {     
      setIsInfoTooltipOpened(true);
      setIsInfoTooltipStatus(false);
      console.err(err?.reason || err?.message);
    } finally {
      setIsLoadingUpdateUser(false);
    }
  }

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


  // Закрытие попапов
  function closeAllPopups() {
    //setIsCardDeletePopupOpen(false);
    // setSelectedCard({});
    setIsInfoTooltipStatus(false);
    setIsInfoTooltipOpened(false);
  }


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

  return (
    <CurrentUserContext.Provider value={{currentUser}}>
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
              <Movies isLoading={isLoading} isLoggedIn={isLoggedIn} setIsLoading={setIsLoading}
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
              isLoading={isLoadingUpdateUser} 
              setIsLoading={setIsLoadingUpdateUser} 
              onUpdateUser={handleUpdateUser}                
              />
            </>
            </ProtectedRoute>
          } />
          <Route path='/signup' element={<Register onSubmit={handleRegisterSubmit} />} />
          <Route path='/signin' element={<Login onSubmit={handleLoginSubmit} />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
        <InfoTooltip
          isOpen={isInfoTooltipOpened}
          //onCloseOverlay={handleOverlayClick}
          onClose={closeAllPopups}
          status={isInfoTooltipStatus}
          text={isInfoTooltipStatus ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
