import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Error from '../Error/Error';
import { useFormWithValidation } from '../../validation/validation';

function Register({ onSubmit, serverError, setServerError }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const patternName = '[a-zA-Zа-яА-ЯЁё \\-]{1,32}';
  const patternEmail = '^[a-z0-9.!#_^\\s@]+@[^\\s@]+\\.[^\\s@]+$';

  const handleFocus = () => {
    setServerError({ isValid: false, text: '' });
  };

  const handleChangeInput = (event, name) => {
    handleChange(event);
    if (name === 'email') {
      setServerError({ isValid: false, text: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    setServerError((prev) => ({ ...prev, isValid: true }));
  };

  return (
    <main>
      <section className='register'>
        <Logo onFocus={handleFocus} />
        <h1 className='register__title'>Добро пожаловать!</h1>
        <form
          className='register__form'
          onSubmit={handleSubmit}
          name='register__form'
          onClick={(e) => e.stopPropagation()}>
          <label
            className='register__label'
            htmlFor='name'>
            Имя
          </label>
          <input
            required
            id={'name'}
            name='name'
            type='text'
            className='register__input'
            placeholder={'Name'}
            value={values.name || ''}
            onChange={handleChangeInput}
            autoComplete='on'
            pattern={patternName}
            error={errors.name}
            minLength='2'
            maxLength='30'></input>
          <Error error={errors.name} />
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
            autoComplete='on'
            pattern={patternEmail}
            onFocus={handleFocus}
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
            autoComplete='on'
            error={errors.password}></input>
          <Error error={errors.password} />
          <span className='register__error-server'>{serverError.text}</span>
          <button
            type='submit'
            className='register__submit'
            disabled={!isValid || (serverError.isValid === true && serverError.text !== '')}>
            Зарегистрироваться
          </button>
          <p className='register__caption'>
            Уже зарегистрированы?{' '}
            <Link
              onFocus={handleFocus}
              to='/signin'
              className='register__caption register__link'>
              Войти
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
export default Register;
