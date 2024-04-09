import { SubmitHandler, useForm } from 'react-hook-form';
// import { useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import './register.css';
import AuthAPI from '../../app/api/Account/Auth/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface RegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState, getValues, reset } =
        useForm<RegisterForm>();
    const { errors } = formState;
    const [showExistsMessage, setShowExistsMessage] = useState(false);
    const [passwordRequirements, setPasswordRequirements] = useState<{
        length: boolean | null;
        number: boolean | null;
        uppercase: boolean | null;
    }>({
        length: null,
        number: null,
        uppercase: null,
    });


    const navigate = useNavigate();

    const resetFormState = (showExists = false) => {
        reset();
        setShowExistsMessage(showExists);
        setPasswordRequirements({
            length: null,
            number: null,
            uppercase: null,
        });
    };

    const mutation = useMutation({
        mutationFn:(data: RegisterForm) => AuthAPI.register(data),
        onSuccess: () => {
            resetFormState();
            navigate('/login'); 
        },
        onError: (error: any) => {
            console.log(error);
            if (error.response && error.response.status === 409) {
                resetFormState(true);
            } else {
                resetFormState();
            }
        }
    });

    const submitForm: SubmitHandler<RegisterForm> = (data) => {
        mutation.mutate(data);
    };
    // const login = useGoogleLogin({
    //     onSuccess: (tokenResponse) => console.log(tokenResponse),
    // });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setPasswordRequirements({
            length: password.length >= 8,
            number: /\d/.test(password),
            uppercase: /[A-Z]/.test(password),
        });
    };

    return (
        <div className="register">
            <div className="register_con">
                <div className="register_form">
                    <h2>Реєстрація</h2>
                    <form onSubmit={handleSubmit(submitForm)} noValidate>
                        <div
                            className={`register_input ${errors.firstName ? 'error' : ''}`}
                        >
                            <label htmlFor="name">Ім'я:</label>
                            <input
                                type="text"
                                placeholder="введіть ім'я"
                                {...register('firstName', {
                                    required: 'Заповніть це поле',
                                    minLength: {
                                        value: 2,
                                        message:
                                            'Мінімальна довжина - 2 символи',
                                    },
                                })}
                            />
                            <p>{errors.firstName?.message as string}</p>
                        </div>

                        <div
                            className={`register_input ${errors.lastName ? 'error' : ''}`}
                        >
                            <label htmlFor="surname">Прізвище:</label>
                            <input
                                type="text"
                                placeholder="введіть прізвище"
                                {...register('lastName', {
                                    required: 'Заповніть це поле',
                                    minLength: {
                                        value: 2,
                                        message:
                                            'Мінімальна довжина - 2 символи',
                                    },
                                })}
                            />
                            <p>{errors.lastName?.message as string}</p>
                        </div>

                        <div
                            className={`register_input ${errors.email ? 'error' : ''}`}
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
                            className={`register_input ${errors.password ? 'error' : ''}`}
                        >
                            <label htmlFor="password">Пароль:</label>
                            <input
                                type="password"
                                {...register('password', {
                                    required: 'Заповніть це поле',
                                    minLength: {
                                        value: 8,
                                        message: '',
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                                        message: '',
                                    },
                                })}
                                placeholder="введіть пароль"
                                onChange={handlePasswordChange}
                            />
                            <p>{errors.password?.message as string}</p>
                        </div>

                        <div
                            className={`register_input ${errors.confirmPassword ? 'error' : ''}`}
                        >
                            <label htmlFor="confirmPassword">
                                Повторіть пароль:
                            </label>
                            <input
                                type="password"
                                {...register('confirmPassword', {
                                    required: 'Заповніть це поле',
                                    validate: (value) =>
                                        value === getValues('password') ||
                                        'Паролі не співпадають',
                                })}
                                placeholder="повторіть пароль"
                            />
                            <p>{errors.confirmPassword?.message as string}</p>
                        </div>

                        <div className="register_btns">
                            <button type="submit" id="log_btn">
                                Зареєструватись
                            </button>
                            {/* <button
                                type="button"
                                onClick={() => login()}
                                id="google_btn"
                            >
                                Зареєструватись з{' '}
                                <img
                                    src="./icons/google.svg"
                                    style={{ width: '20px' }}
                                />
                            </button> */}
                        </div>
                    </form>
                </div>
                {showExistsMessage && !errors.password && (
                    <div className="exists_message">
                        <p>
                            Акаунт з такою поштою вже існує. <br />
                            Спробуйте ще раз
                        </p>
                    </div>
                )}
                {passwordRequirements.length !== null && (
                    <div className="password_message">
                        <p>Вимоги до пароля</p>
                        {Object.entries(passwordRequirements).map(
                            ([requirement, fulfilled]) => (
                                <div key={requirement}>
                                    <p
                                        style={{
                                            color: fulfilled
                                                ? '#19BE6F'
                                                : 'red',
                                        }}
                                    >
                                        <span style={{ color: 'black' }}>
                                            &#8226;
                                        </span>
                                        {requirement === 'length'
                                            ? ' 8 символів'
                                            : requirement === 'number'
                                              ? ' 1 число'
                                              : ' 1 буква у верхньому регістрі'}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
