import React from 'react';
// import { Link } from "react-router-dom";


function Profile({ handleExitUser }) {

    return (
        <main>
            <section className='profile'>
                <h2 className='profile__title' >Привет, Виталий!</h2>
                <form className='profile__form'>
                    <div className='profile__data-box'>
                        <label htmlFor='name' className='profile__name'>Имя</label>
                        <input required id='name' name='name' type='text' className='profile__input' placeholder='Виталий' />
                    </div>
                    <hr className='profile__line' />
                    <div className='profile__data-box'>
                        <label htmlFor='email' className='profile__name'>E-mail</label>
                        <input required id='email' name='email' type='email' className='profile__input' placeholder='pochta@yandex.ru' />
                    </div>
                </form>
                <button className='profile__edit-btn'>Редактировать</button>
                <button className='profile__go-out' onClick={handleExitUser}>Выйти из аккаунта</button>
            </section >
        </main>
    )
}
export default Profile