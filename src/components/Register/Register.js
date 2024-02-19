import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Error from '../Error/Error';
import { useFormWithValidation } from '../../validation/validation';

function Register({ onSubmit, textErrorServer, }) {
    const { values, handleChange, errors, isValid} = useFormWithValidation();
    const patternName = '[a-zA-Zа-яА-ЯЁё -]{2,30}*$';
    const patternEmail ='[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}';
    
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        onSubmit({
            name: values.name,
            email: values.email,
            password: values.password
        });
    }, [values, onSubmit])
    
    return (
        <main>
            <section className='register'>
                <Logo />
                <h1 className='register__title'>Добро пожаловать!</h1>
                <form className='register__form' onSubmit={handleSubmit} name='register__form'
                    onClick={e => e.stopPropagation()}>{/*чтобы не закрывалось при клике на саму форму*/}
                    <label className='register__label' htmlFor='name'>Имя</label>
                    <input
                        required id={'name'}
                        name='name'
                        type='text'
                        className='register__input'
                        placeholder={'Name'}
                        value={values.name || ''}
                        onChange={handleChange}
                        autoComplete='on'
                        pattern={patternName}
                        // pattern='[a-zA-Zа-яА-ЯЁё\s-]{2,30}*$'
                        // error={errors.name('Допустимы латинские буквы пробел')}
                        // title={'Имя должно содержать только латиницу, кириллицу, пробел или дефис'}
                        error={errors.name}
                        minLength='2'
                        maxLength='30'                       
                    >
                    </input>
                    <Error error={errors.name} />                   
                    <label className='register__label' htmlFor='email'>E-mail</label>
                    <input
                        required id={'email'}
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
                        required id={'password'}
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
                    <button type='submit' className='register__submit' disabled={!isValid}>Зарегистрироваться</button>
                    {/* <button type='submit' className={`register__submit ${formValid ? 'register__submit_disabled' : ''}`}>Зарегистрироваться</button> */}
                    <p className='register__caption'>Уже зарегистрированы? <Link to='/signin' className='register__caption register__link'>Войти</Link></p>
                </form>
            </section>
        </main>
    )
}
export default Register
////////////////////////////
// function Register({ onSubmit }) {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');    
//     const [errorName, setErrorName] = useState({}); // текст ошибок
//     const [errorEmail, setErrorEmail] = useState({}); // текст ошибок
//     const [errorPassword, setErrorPassword] = useState({}); // текст ошибок   
//     const [formValid, setFormValid] = useState(false); // валидна форма или нет

// useEffect(() => {
//     if (errorName.text || errorEmail.text || errorPassword.text) {
//         setFormValid(false)
//     } else {
//         setFormValid(true)
//     }
// }, [errorName, errorEmail, errorPassword, setFormValid])

// const nameHandler = (e) => {
//     setName(e.target.value);
//     const re = /^[a-zA-Zа-яА-ЯЁё\s-]+$/
//     if (!re.test(String(e.target.value).toLocaleLowerCase())) {
//         setErrorName({
//             text: 'Имя должно содержать только латиницу, кириллицу, пробел или дефис',
//         });
//         if (e.target.value.length < 2 || e.target.value.length > 30) {
//             setErrorName({
//                 text: 'Имя должно содержать от 2 до 30 символов',
//             })
//             if (!e.target.value) {
//                 setErrorName({
//                     text: 'Заполните это поле',
//                 })
//             }
//         }
//     }
//     else {
//         setErrorName({})
//     }
// }

// const emailHandler = (e) => {
//     setEmail(e.target.value)
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!re.test(String(e.target.value).toLocaleLowerCase())) {
//         setErrorEmail({
//             text: 'Введите корректный Email',
//         });
//         if (!e.target.value) {
//             setErrorEmail({
//                 text: 'Заполните это поле',
//             })
//         }
//     } else {
//         setErrorEmail({})
//     }
// }
// const passworHandler = (e) => {
//     setPassword(e.target.value)
//     if (e.target.value.length < 2 || e.target.value.length > 8) {
//         setErrorPassword({
//             text: 'Пароль должен содержать от 2 до 8 символов',
//         });
//         if (!e.target.value) {
//             setErrorPassword({
//                 text: 'Заполните это поле',
//             })
//         }
//     } else {
//         setErrorPassword({})
//     }
// }



// const handleSubmit = useCallback((e) => {
//     e.preventDefault();
//     onSubmit({ name, email, password });
// }, [name, email, password, onSubmit])

// return (
//     <main>
//         <section className='register'>
//             <Logo />
//             <h1 className='register__title'>Добро пожаловать!</h1>
//             <form className='register__form' onSubmit={handleSubmit} action="#" name='register__form'
//                 onClick={e => e.stopPropagation()}>{/*чтобы не закрывалось при клике на саму форму*/}
//                 <label className='register__label' htmlFor='name'>Имя</label>
//                 <input
//                     required id={'name'}
//                     name='name'
//                     type='name'
//                     className='register__input'
//                     placeholder={'Name'}
//                     value={name || ''}
//                     // onBlur={(e) => blurHandler(e)}
//                     onChange={e => nameHandler(e)}
//                     autoComplete={'on'}
//                 >
//                 </input>
//                 <Error error={errorName.text} name={'name'} />
//                 {/* {(nameDirty && errorName) && <Error error={errorName.text} />} */}
//                 <label className='register__label' htmlFor='email'>E-mail</label>
//                 <input
//                     required id={'email'}
//                     name='email'
//                     type='email'
//                     className='register__input'
//                     placeholder={'Email'}
//                     value={email || ''}
//                     //  onBlur={(e) => blurHandler(e)}
//                     onChange={(e) => emailHandler(e)}
//                     autoComplete={'on'}
//                 >
//                 </input>
//                 <Error error={errorEmail.text} name={'email'} />
//                 <label className='register__label' htmlFor='password'>Пароль</label>
//                 <input
//                     required id={'password'}
//                     name={'password'}
//                     type={'password'}
//                     className='register__input register__input-red'
//                     placeholder={'Пароль'}
//                     value={password || ''}
//                     //  onBlur={(e) => blurHandler(e)}
//                     onChange={e => passworHandler(e)}
//                     autoComplete={"on"}
//                 >
//                 </input>
//                 {/* {(passwordDirty && passwordError) && <p className='register__error'>{passwordError}</p>} */}
//                 <Error error={errorPassword.text} name={'password'} />
//                 <button type='submit' className='register__submit' disabled={!formValid}>Зарегистрироваться</button>
//                 {/* <button type='submit' className={`register__submit ${formValid ? 'register__submit_disabled' : ''}`}>Зарегистрироваться</button> */}
//                 <p className='register__caption'>Уже зарегистрированы? <Link to='/signin' className='register__caption register__link'>Войти</Link></p>
//             </form>
//         </section>
//     </main>
// )
// }
// export default Register

/////////////////////////
 // const blurHandler = (e) => {
    //     // eslint-disable-next-line default-case
    //     switch (e.target.name) {
    //         case 'name':
    //             setNameDirty(true);
    //             // setErrorName({
    //             //     text: 'Имя должно содержать от 2 до 30 символов',
    //             // });
    //             break;
    //         case 'email':
    //             setEmailDirty(true);
    //             // setErrorEmail({ 
    //             //     text: 'Введите Email',
    //             //  });
    //             // emailHandler(e, setErrorEmail);
    //             break;
    //         case 'password':
    //             setPasswordDirty(true);
    //             // setErrorPassword({
    //             //     text: 'Пароль должен содержать от 2 до 30 символов',
    //             // });
    //             break;
    //         default:
    //             break;
    //     }
    // };
