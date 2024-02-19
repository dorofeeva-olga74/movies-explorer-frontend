import React, { useContext, useState, useCallback, useEffect } from 'react';
import CurrentUserContext from '../../contecst/CurrentUserContext.js';
import { useFormWithValidation } from '../../validation/validation.js';
import Error from '../Error/Error.js';

export function Profile({ handleExitUser, isLoading, onUpdateUser, setIsLoading, textErrorServer }) {
    const {currentUser} = useContext(CurrentUserContext);
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    const [nameButton, setNameButton] = useState('Редактировать');
    const [type, setType] = useState('button');

    const patternName = '[a-zA-Zа-яА-ЯЁё -]{2,30}*$';
    const patternEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}/;

    const handleChangeButtonClick = () => {
        setIsLoading(true);
        console.log("click");
        setNameButton('Сохранить');
        setType('submit');
    };    
    const handleSubmit = useCallback((e) => {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        console.log("submit");
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({ name: values.name, email: values.email });
        setNameButton('Редактировать');
        setType('button');
    }, [onUpdateUser, values.name, values.email,]);

    useEffect(() => {
        values.name !== currentUser.name || values.email !== currentUser.email
            ? setIsLoading(true)
            : setIsLoading(false);
    }, [values.name, currentUser.name, values.email, currentUser.email, setIsLoading]);

    const handleClick = e => {
        if (!isLoading) {
            handleChangeButtonClick(e);
        } else {
            handleSubmit(e);
        }
    };
    useEffect(() => {
        resetForm({ name: currentUser.name, email: currentUser.email }, {}, false);
    }, [resetForm, currentUser]);
   
    return (
        <main>
            <section className='profile'>
                <h2 className='profile__title'>{`Привет,${currentUser.name}!`}</h2>
                <form className='profile__form' onSubmit={handleClick}>
                    <div className='profile__data-box'>
                        <label htmlFor='name' className='profile__name'>Имя</label>
                        <input required
                            id='name'
                            name='name'
                            type='text'
                            // placeholder={currentUser.name}
                            value={values.name || currentUser.name}
                            className='profile__input'
                            autoComplete='on'
                            pattern={patternName}
                            onChange={handleChange}
                            disabled={!isLoading}
                            error={errors.name}
                            minLength='2'
                            maxLength='30' />
                    </div>
                    <Error error={errors.name} />
                    <hr className='profile__line' />
                    <div className='profile__data-box'>
                        <label htmlFor='email' className='profile__name'>E-mail</label>
                        <input required
                            id='email'
                            name='email'
                            type='email'
                            // placeholder={currentUser.email}
                            value={values.email || currentUser.email}
                            className='profile__input'
                            // onChange={(e) => e.target.value}
                            onChange={handleChange}
                            autoComplete='on'
                            disabled={!isLoading}
                            pattern={patternEmail}
                            error={errors.email} />
                    </div>
                    <Error error={errors.email} />
                </form>
                {isLoading ? (
                    <>
                        <span className='profile__error-server'>{textErrorServer}</span>
                        <button
                            className={`profile__edit-btn_submit ${!isValid ? 'profile__edit-btn_submit_disabled' : ''}`}
                            type={type} onClick={handleClick}>{nameButton}
                        </button>
                    </>
                ) : (
                    <>
                        <button className='profile__edit-btn' type={type} onClick={handleClick}>{nameButton}</button>
                        <button className='profile__go-out' onClick={handleExitUser}>Выйти из аккаунта</button>
                    </>
                )}
                {/* <button
                    // className={isClassName}
                    className={`profile__edit-btn  ${isLoading ? 'profile__edit-btn_submit' : ''}`}
                    // className={`profile__edit-btn_submit ${!isValid ? 'profile__edit-btn_submit_disabled' : ''}`}
                    type={type}
                    // disabled={!isLoading || !isValid}                   
                    onClick={handleClick}>{nameButton}
                </button>
                {!isLoading && <button className='profile__go-out' onClick={handleExitUser}>Выйти из аккаунта</button>} */}
            </section>
        </main>
    );
}
