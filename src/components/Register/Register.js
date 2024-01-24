import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Register({ onSubmit }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        onSubmit({ name, email, password });
    }, [name, email, password, onSubmit])
    return (
        <>
            <section className='register'>
                <Logo />
                <h2 className='register__title'>Добро пожаловать!</h2>
                <form className='register__form' onSubmit={handleSubmit} action="#" name='register__form'
                    onClick={e => e.stopPropagation()}>{/*чтобы не закрывалось при клике на саму форму*/}
                    <label className='register__label' htmlFor='name'>Имя</label>
                    <input
                        required id={'name'}
                        name='name'
                        type='name'
                        className='register__input'
                        placeholder={'Name'}
                        value={name || ' '}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete={'on'}
                    >
                    </input>
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
                        className='register__input selected'
                        placeholder={'Пароль'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete={"on"}
                    >
                    </input>
                    <button type='submit' className='register__submit'>Зарегистрироваться</button>
                    <p className='register__caption'>Уже зарегистрированы? <Link to='/signin' className='register__caption register__link'>Войти</Link></p>
                </form>
            </section>
        </>
    )
}
export default Register