import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Login({ onSubmit }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        onSubmit({ email, password });
    }, [email, password, onSubmit])
    return (
        <main>
            <section className='register login'>
                <Logo />
                <h1 className='register__title'>Рады видеть!</h1>
                <form className='register__form' onSubmit={handleSubmit} action="#" name='register__form'
                    onClick={e => e.stopPropagation()}>{/*чтобы не закрывалось при клике на саму форму*/}
                    <label className='register__label' htmlFor='email'>E-mail</label>
                    <input
                        required id={'email'}
                        name='email'
                        type='email'
                        className='register__input'
                        placeholder={'Email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete={'on'}
                    >
                    </input>
                    <label className='register__label' htmlFor='password'>Пароль</label>
                    <input
                        required id={'password'}
                        name={'password'}
                        type={'password'}
                        className='register__input register__input-red'
                        placeholder={'Пароль'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete={"on"}
                    >
                    </input>
                    <button type='submit' className='register__submit login__submit'>Войти</button>
                    <p className='register__caption'>Ещё не зарегистрированы? <Link to='/signup' className='register__caption register__link'>Регистрация</Link></p>
                </form>
            </section>
        </main>
    )
}
export default Login