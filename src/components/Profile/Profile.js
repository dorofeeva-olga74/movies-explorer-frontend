import React, { useContext, useState,} from 'react';
import CurrentUserContext from '../../contecst/CurrentUserContext';

function Profile({ handleExitUser, isLoading, onUpdateUser, setIsLoading, }) {
    const currentUser = useContext(CurrentUserContext);
    const [nameButton, setNameButton] = useState('Редактировать')
    const [type, setType] = useState('button');
    console.log(currentUser); 
    
    const handleCgangeButtonClick = () => {
        setIsLoading(true);
        console.log("click");
        setNameButton('Сохранить');
        setType('submit');
    }
    const handleSubmit = (e, name, email) => {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        console.log("submit");
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser(name, email);
        setNameButton('Редактировать');
        setType('button');
    }
    const handleClick = e => { 
        if (!isLoading) {      
        handleCgangeButtonClick(e);
        } else {
        handleSubmit(e);
        }
      };
    

    return (
        <main>
            <section className='profile'>
                <h2 className='profile__title' >{`Привет,${currentUser.name}!`}</h2>
                <form className='profile__form'>
                    <div className='profile__data-box'>
                        <label htmlFor='name' className='profile__name'>Имя</label>
                        <input required
                            id='name'
                            name='name'
                            type='text'
                            value={currentUser.name}
                            className='profile__input'
                            onChange={(e) => e.target.value}
                            disabled={!isLoading}
                        />
                    </div>
                    <hr className='profile__line' />
                    <div className='profile__data-box'>
                        <label htmlFor='email' className='profile__name'>E-mail</label>
                        <input required
                            id='email'
                            name='email'
                            type='email'
                            value={currentUser.email}
                            className='profile__input'
                            onChange={(e) => e.target.value}
                            disabled={!isLoading}
                        />
                    </div>
                </form>
                <button className='profile__edit-btn' type={type} onClick={handleClick}>{nameButton}</button>
                {!isLoading && <button className='profile__go-out' onClick={handleExitUser}>Выйти из аккаунта</button>}
            </section >
        </main>
    )
}
export default Profile