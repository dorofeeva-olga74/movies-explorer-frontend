import React, { useContext, useCallback, useEffect } from 'react';
import CurrentUserContext from '../../contecst/CurrentUserContext.js';
import { useFormWithValidation } from '../../validation/validation.js';
import Error from '../Error/Error.js';

export function Profile({ handleExitUser, isLoading, onUpdateUser, setIsLoading, serverError, setServerError }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const patternName = '[a-zA-Zа-яА-ЯЁё \\-]{1,30}';
  const patternEmail = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$';

  const handleChangeButtonClick = () => {
    setIsLoading(true);
    console.log('click');
  };
  const handleSubmit = useCallback(
    (e) => {
      // Запрещаю браузеру переходить по адресу формы
      e.preventDefault();
      console.log('submit');
      // Передаю значения управляемых компонентов во внешний обработчик
      onUpdateUser({ name: values.name, email: values.email });
      setServerError((prev) => ({ ...prev, isValid: true }));
    },
    [onUpdateUser, values.name, values.email, setServerError]
  );
  // функция-обработчик события onFocus
  const handleFocus = () => {
    setServerError({ isValid: false, text: '' });
  };

  useEffect(() => {
    values.name !== currentUser.name || values.email !== currentUser.email ? setIsLoading(true) : setIsLoading(false);
  }, [values.name, currentUser.name, values.email, currentUser.email, setIsLoading]);

  const handleClick = (e) => {
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
        <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
        <form
          className='profile__form'
          onSubmit={handleClick}>
          <div className='profile__data-box'>
            <label
              htmlFor='name'
              className='profile__name'>
              Имя
            </label>
            <input
              required
              id='name'
              name='name'
              type='text'
              value={values.name || currentUser.name}
              className='profile__input'
              autoComplete='off'
              pattern={patternName}
              onChange={handleChange}
              onFocus={handleFocus}
              disabled={!isLoading}
              error={errors.name}
              minLength='2'
              maxLength='30'
            />
          </div>
          <Error error={errors.name} />
          <hr className='profile__line' />
          <div className='profile__data-box'>
            <label
              htmlFor='email'
              className='profile__name'>
              E-mail
            </label>
            <input
              required
              id='email'
              name='email'
              type='email'
              value={values.email || currentUser.email}
              className='profile__input'
              onChange={handleChange}
              onFocus={handleFocus}
              autoComplete='off'
              disabled={!isLoading}
              pattern={patternEmail}
              error={errors.email}
            />
          </div>
          <Error error={errors.email} />
        </form>
        {isLoading ? (
          <>
            <span className='profile__error-server'>{serverError.text}</span>
            <button
              className={'profile__edit-btn_submit'}
              disabled={!isValid || (serverError.isValid === true && serverError.text !== '')}
              type='submit'
              onClick={handleClick}>
              {'Сохранить'}
            </button>
          </>
        ) : (
          <>
            <button
              className='profile__edit-btn'
              type='button'
              onClick={handleClick}>
              {'Редактировать'}
            </button>
            <button
              className='profile__go-out'
              onClick={handleExitUser}>
              Выйти из аккаунта
            </button>
          </>
        )}
      </section>
    </main>
  );
}
