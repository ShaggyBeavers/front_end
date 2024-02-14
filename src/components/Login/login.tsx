import { SubmitHandler, useForm } from 'react-hook-form';
import { useGoogleLogin } from '@react-oauth/google';
import React from 'react';
import './login.css';
import AuthAPI from '../../app/api/Account/Auth/auth';

interface LoginForm {
    email: string;
    password: string;
}

export default function Login() {
    const { register, handleSubmit, formState, reset } = useForm<LoginForm>();
    const { errors } = formState;
    const [showNotFoundMessage, setShowNotFoundMessage] = React.useState(false);

    const submitForm: SubmitHandler<LoginForm> = async (data) => {
        try {
            await AuthAPI.login(data);
            reset();
            setShowNotFoundMessage(false);
        } catch (error: any) {

            if (error.response && (error.response.status === 403)) {
                reset();
                setShowNotFoundMessage(true);
            } else {
                console.log(data);
                console.log(error)
            }
        }
    };

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => console.log(tokenResponse),
    });

    return (
        <div className="login">
            <div className="login_con">
                <div className="login_form">
                    <h2>Вхід</h2>
                    <form onSubmit={handleSubmit(submitForm)} noValidate>
                        <div
                            className={`login_input ${errors.email ? 'error' : ''}`}
                        >
                            <label htmlFor="email">Пошта:</label>
                            <input
                                type="email"
                                placeholder="введіть пошту"
                                {...register('email', {
                                    required: {
                                        value: true,
                                        message: 'Заповніть це поле',
                                    },
                                    pattern: {
                                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                        message: 'Некоректний формат',
                                    },
                                })}
                            />
                            <p className="">
                                {errors.email?.message as string}
                            </p>
                        </div>

                        <div
                            className={`login_input ${errors.password ? 'error' : ''}`}
                        >
                            <label htmlFor="password">Пароль:</label>
                            <input
                                type="password"
                                {...register('password', {
                                    required: 'Заповніть це поле',
                                })}
                                placeholder="введіть пароль"
                            />
                            <p>{errors.password?.message as string}</p>
                        </div>

                        <div className="log_recovery">
                            <p>Забув пароль?</p>
                            <a href="/recovery">Відновити</a>
                        </div>

                        <div className="login_btns">
                            <button type="submit" id="log_btn">
                                Увійти
                            </button>
                            <button
                                type="button"
                                onClick={() => login()}
                                id="google_btn"
                            >
                                Увійти з{' '}
                                <img
                                    src="./icons/google.svg"
                                    style={{ width: '20px' }}
                                />
                            </button>
                        </div>
                    </form>
                </div>
                {showNotFoundMessage && (
                    <div className="not_found_message">
                        <p>Акаунт не знайдено. Перевірте введені дані</p>
                    </div>
                )}
            </div>
        </div>
    );
}
