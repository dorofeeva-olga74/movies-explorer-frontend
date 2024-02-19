import React, { useCallback} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { useFormWithValidation } from '../../validation/validation';
import Error from '../Error/Error';

function Login({ onSubmit, textErrorServer }) {    
    const patternEmail =/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}/;
    const { values, handleChange, errors, isValid } = useFormWithValidation();
    
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        onSubmit({ 
            email: values.email, 
            password: values.password });           
    }, [onSubmit, values])  

    // useEffect((input, button, disabled) => {    
    // if (input.value.length > 0 ) {
    //      button.disabled(isValid)
    // }
    // },[isValid, input]);

    return (
        <main>
            <section className='register login'>
                <Logo />
                <h1 className='register__title'>Рады видеть!</h1>
                <form className='register__form' onSubmit={handleSubmit} name='register__form'
                    onClick={e => e.stopPropagation()}>{/*чтобы не закрывалось при клике на саму форму*/}
                    <label className='register__label' htmlFor='email'>E-mail</label>
                    <input
                        required 
                        id={'email'}
                        name='email'
                        type='email'
                        className='register__input'
                        placeholder={'Email'}
                        value={values.email || ''}
                        onChange={handleChange}
                        autoComplete='on'
                        pattern={patternEmail}
                        error={errors.email}
                    >
                    </input>
                    <Error error={errors.email} />
                    <label className='register__label' htmlFor='password'>Пароль</label>
                    <input
                        required 
                        id={'password'}
                        name={'password'}
                        type={'password'}
                        className='register__input register__input-red'
                        placeholder={'Пароль'}
                        value={values.password || ''}
                        onChange={handleChange}
                        autoComplete='on'
                        error={errors.password}
                    >
                    </input>                    
                    <Error error={errors.password} />
                    <span className='register__error-server'>{textErrorServer}</span>
                    <button type='submit' className='register__submit login__submit' disabled={!isValid}>Войти</button>
                    {/* <button type='submit' className={`register__submit login__submit ${!isValid ? 'register__submit_disabled' : ''}`}>Войти</button> */}
                    <p className='register__caption'>Ещё не зарегистрированы? <Link to='/signup' className='register__caption register__link'>Регистрация</Link></p>
                </form>
            </section>
        </main>
    )
}
export default Login