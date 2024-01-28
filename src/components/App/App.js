import React from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from "react";
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
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);//зарегистрирован пользователь или нет  
  const navigate = useNavigate();
  //выход пользователя со страницы
  const handleExitUser = () => {
    setIsLoggedIn(false);
    navigate('/');
  }

  return (
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
          <>
            <Header isLoggedIn={isLoggedIn} handleExitUser={handleExitUser} />
            <Movies />
            <Footer />
          </>
        } />
        <Route path='/saved-movies' element={
          <>
            <Header isLoggedIn={isLoggedIn} handleExitUser={handleExitUser} />
            <SavedMovies />
            <Footer />
          </>
        } />
        <Route path='/profile' element={
          <>
            <Header isLoggedIn={isLoggedIn} handleExitUser={handleExitUser} />
            <Profile handleExitUser={handleExitUser} />
          </>
        } />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  );
}
export default App;
