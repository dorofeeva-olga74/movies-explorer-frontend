import React from 'react';


function Profile(props) {

    return (
        <>
            <section className='profile'>
                <h1 className='profile__title' >Привет, Виталий!</h1>
                <form className='profile__form'>
                    <div className='profile__dataBox'>
                        <label htmlFor='name' className='profile__name'>Имя</label>
                        <input required id='name' name='name' type='text' className='profile__input' placeholder='Виталий' />
                    </div>
                    <hr className='profile__line' />
                    <div className='profile__dataBox'>
                        <label htmlFor='email' className='profile__name'>E-mail</label>
                        <input required id='email' name='email' type='email' className='profile__input' placeholder='pochta@yandex.ru' />
                    </div>
                </form>
                <button className='profile__edit-btn'>Редактировать</button>
                <button className='profile__go-out'>Выйти из аккаунта</button>
            </section >
        </>
    )
}
export default Profile