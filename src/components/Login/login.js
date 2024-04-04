import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { useFormWithValidation } from '../../validation/validation';
import Error from '../Error/Error';

function Login({ onSubmit, serverError, setServerError }) {
  const patternEmail = '^[a-z0-9.!#_^\\s@]+@[^\\s@]+\\.[^\\s@]+$';
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  // функция-обработчик события onFocus
  const handleFocus = () => {
    setServerError({ isValid: false, text: '' });
  };

  const handleChangeInput = (event, name) => {
    handleChange(event);
    if (name === 'email') {
      setServerError({ isValid: false, text: '' });
    }
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit({
        email: values.email,
        password: values.password,
      });
      setServerError((prev) => ({ ...prev, isValid: true }));
    },
    [onSubmit, values, setServerError]
  );

  return (
    <main>
      <section className='register login'>
        <Logo onFocus={handleFocus} />
        <h1 className='register__title'>Рады видеть!</h1>
        <form
          className='register__form'
          onSubmit={handleSubmit}
          name='register__form'
          onClick={(e) => e.stopPropagation()}>
          <label
            className='register__label'
            htmlFor='email'>
            E-mail
          </label>
          <input
            required
            id={'email'}
            name='email'
            type='email'
            className='register__input'
            placeholder={'Email'}
            value={values.email || ''}
            onChange={handleChangeInput}
            onFocus={handleFocus}
            autoComplete='on'
            pattern={patternEmail}
            error={errors.email}></input>
          <Error error={errors.email} />
          <label
            className='register__label'
            htmlFor='password'>
            Пароль
          </label>
          <input
            required
            id={'password'}
            name={'password'}
            type={'password'}
            className='register__input register__input-red'
            placeholder={'Пароль'}
            value={values.password || ''}
            onChange={handleChangeInput}
            onFocus={handleFocus}
            autoComplete='on'
            error={errors.password}></input>
          <Error error={errors.password} />
          <span className='register__error-server'>{serverError.text}</span>
          <button
            type='submit'
            className='register__submit'
            disabled={!isValid || (serverError.isValid === true && serverError.text !== '')}>
            Войти
          </button>
          <p className='register__caption'>
            Ещё не зарегистрированы?
            <Link
              to='/signup'
              className='register__caption register__link'
              onFocus={handleFocus}>
              Регистрация
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
export default Login;
