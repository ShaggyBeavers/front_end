import { FieldValues, useForm } from 'react-hook-form';
import { useGoogleLogin } from '@react-oauth/google';
import React from 'react';
import './register.css';
import agent from '../../app/api/agent';


export default function Register() {
    const { register, handleSubmit, formState, getValues, reset } = useForm();
    const { errors } = formState;
    const [showExistsMessage, setShowExistsMessage] = React.useState(false);

    async function submitForm(data: FieldValues) {
        try {
            await agent.Account.register(data);
        } catch (error: any) {
            if (error.response.status === 403) {
                reset();
                setShowExistsMessage(true);
            } else {

            }
        }
    }

    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
    });

    return (
        <div className="register">
            <div className='register_con'>
                <div className='register_form'>
                    <h2>Реєстрація</h2>
                    <form onSubmit={handleSubmit(submitForm)} noValidate>
                        <div className={`register_input ${errors.name ? 'error' : ''}`}>
                            <label htmlFor="name">Ім'я:</label>
                            <input
                                type="text"
                                placeholder="введіть ім'я"
                                {...register('name', {
                                    required: 'Заповніть це поле', minLength: {
                                        value: 2,
                                        message: 'Мінімальна довжина - 2 символи',
                                    },
                                })} />
                            <p>{errors.name?.message as string}</p>
                        </div>

                        <div className={`register_input ${errors.surname ? 'error' : ''}`}>
                            <label htmlFor="surname">Прізвище:</label>
                            <input
                                type="text"
                                placeholder='введіть прізвище'
                                {...register('surname', {
                                    required: 'Заповніть це поле', minLength: {
                                        value: 2,
                                        message: 'Мінімальна довжина - 2 символи',
                                    },
                                })}

                            />
                            <p>{errors.surname?.message as string}</p>
                        </div>

                        <div className={`register_input ${errors.email ? 'error' : ''}`}>
                            <label htmlFor="email">Пошта:</label>
                            <input
                                type="email"
                                placeholder='введіть пошту'
                                {...register('email', { required: { value: true, message: 'Заповніть це поле' }, pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'Некоректний формат' } })}
                            />
                            <p className=''>{errors.email?.message as string}</p>
                        </div>


                        <div className={`register_input ${errors.password ? 'error' : ''}`}>
                            <label htmlFor="password">Пароль:</label>
                            <input
                                type="password"
                                {...register('password', {
                                    required: 'Заповніть це поле', minLength: {
                                        value: 8,
                                        message: '',
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                                        message: '',
                                    }
                                })}
                                placeholder='введіть пароль'
                            />
                            <p>{errors.password?.message as string}</p>
                        </div>


                        <div className={`register_input ${errors.confirmPassword ? 'error' : ''}`}>
                            <label htmlFor="confirmPassword">Повторіть пароль:</label>
                            <input
                                type="password"
                                {...register('confirmPassword', {
                                    required: 'Заповніть це поле',
                                    validate: value => value === getValues('password') || 'Паролі не співпадають'
                                })}
                                placeholder='повторіть пароль'
                            />
                            <p>{errors.confirmPassword?.message as string}</p>
                        </div>

                        <div className='register_btns'>
                            <button type="submit" id='log_btn'>Зареєструватись</button>
                            <button type='button' onClick={() => login()} id='google_btn'>
                                Зареєструватись з <img src="./icons/google.svg" style={{width:'20px'}}/>
                            </button>
                        </div>
                    </form>
                </div>
                {showExistsMessage && (
                    <div className='exists_message'>
                        <p>Акаунт з такою поштою вже існує. <br />Спробуйте ще раз</p>
                    </div>
                )}

                {errors.password && (
                    <div className='password_message'>
                        <p>Вимоги до пароля:</p>
                        <ul>
                            <li><p style={{ color: '#19BE6F' }}>8 символів</p></li>
                            <li><p style={{ color: 'red' }}>1 число</p></li>
                            <li><p style={{ color: 'red' }}>1 буква у верхньому регістрі</p></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}
