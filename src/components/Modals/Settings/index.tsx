import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import './index.css';
import Arrow from '../../Arrow';
import EditIcon from '../../EditIcon';
import { useAuthStore } from '../../../stores/AuthStore';
import { roleToUkr } from '../../../types/role';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import UserAPI from '../../../../src/app/api/Account/User/user';

const Settings = () => {
    const queryClient = useQueryClient();
    const userProfile = useQuery({
        queryKey: ['currentUser'],
        queryFn: () => UserAPI.getUserProfile(),
    });

    const editUser = useMutation({
        mutationFn: (values: {
            email: string;
            firstName: string;
            lastName: string;
        }) => UserAPI.editUser(values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        },
    });

    const newPassword = useMutation({
        mutationFn: (values: {
            password: string;
            passwordConfirmation: string;
        }) => UserAPI.newPassword(values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const [isCategoryListVisible, setIsCategoryListVisible] =
        React.useState(false);

    const user = useAuthStore((state) => state.user) || {};

    const password = watch('oldPassword', '');

    const passwordValidation = {
        length: password.length >= 8,
        number: /\d/.test(password),
        uppercase: /[A-Z]/.test(password),
    };

    const firstName = 'Іван';
    const lastName = 'Бобрар';
    const role = 'Модератор';

    const onSubmitEmailName = (data: any) => {
        const email = userProfile.data?.data.email;
        const firstName = data.firstName || userProfile.data?.data.firstName;
        const lastName = data.lastName || userProfile.data?.data.lastName;

        if (data.firstName || data.lastName) {
            editUser.mutate({
                email,
                firstName,
                lastName,
            });
        }
    };

    const onSubmitPassword = (data: any) => {
        const password = data.oldPassword;
        const passwordConfirmation = data.newPassword;
        if (data.newPassword) {
            newPassword.mutate({
                password,
                passwordConfirmation,
            });
        }
    };

    if (userProfile.isLoading) return <div>Loading...</div>;

    if (userProfile.isError)
        return <div>Error: {String(userProfile.error)}</div>;

    const userData = userProfile.data?.data;

    const categories = userData.categories;
    const regions = userData.regions;

    return (
        <form className="table-form" onSubmit={handleSubmit(onSubmitEmailName)}>
            <div className="col-1">
                <div className="inputs">
                    <form className="info-block">
                        <div className="input-section">
                            <label htmlFor="firstName">Ваше ім'я:</label>
                            <div className="input-row">
                                <input
                                    type="text"
                                    id="firstName"
                                    placeholder={userData.firstName}
                                    {...register('firstName')}
                                />
                                <EditIcon />
                            </div>
                            {errors.firstName && (
                                <span>Це поле є обов'язковим</span>
                            )}
                        </div>

                        <div className="input-section">
                            <label htmlFor="lastName">Ваше прізвище:</label>
                            <div className="input-row">
                                <input
                                    type="text"
                                    id="lastName"
                                    placeholder={userData.lastName || ''}
                                    {...register('lastName')}
                                />
                                <EditIcon />
                            </div>
                            {errors.lastName && (
                                <span>Це поле є обов'язковим</span>
                            )}
                        </div>
                        <button className="submit-button" type="submit">
                            Зберегти
                        </button>
                    </form>

                    <form
                        className="info-block"
                        onSubmit={handleSubmit(onSubmitPassword)}
                    >
                        <div className="password-block">
                            <div className="input-section">
                                <label htmlFor="oldPassword">
                                    Введіть старий пароль:
                                </label>
                                <input
                                    className="password"
                                    type="password"
                                    id="oldPassword"
                                    {...register('oldPassword', {
                                        required: {
                                            value: true,
                                            message: "Це поле є обов'язковим",
                                        },
                                        minLength: {
                                            value: 8,
                                            message:
                                                'Пароль повинен містити принаймні 8 символів',
                                        },
                                        validate: {
                                            hasNumber: (value) =>
                                                /\d/.test(value) ||
                                                'Пароль повинен містити принаймні 1 число',
                                            hasUppercase: (value) =>
                                                /[A-Z]/.test(value) ||
                                                'Пароль повинен містити принаймні 1 велику літеру',
                                        },
                                    })}
                                />
                                {errors.oldPassword && (
                                    <span className="errors">
                                        {/* {errors.oldPassword?.message as string} */}
                                    </span>
                                )}
                                <div className="password-req">
                                    <p>Вимоги до паролю</p>
                                    <ul>
                                        <li
                                            className={
                                                password
                                                    ? passwordValidation.length
                                                        ? 'password-req-valid'
                                                        : 'password-req-invalid'
                                                    : 'password-req-default'
                                            }
                                        >
                                            8 символів
                                        </li>
                                        <li
                                            className={
                                                password
                                                    ? passwordValidation.number
                                                        ? 'password-req-valid'
                                                        : 'password-req-invalid'
                                                    : 'password-req-default'
                                            }
                                        >
                                            1 число
                                        </li>
                                        <li
                                            className={
                                                password
                                                    ? passwordValidation.uppercase
                                                        ? 'password-req-valid'
                                                        : 'password-req-invalid'
                                                    : 'password-req-default'
                                            }
                                        >
                                            1 буква у верхньому регістрі
                                        </li>
                                        {/* <li className={passwordValidation.length ? 'requirement-met' : 'requirement-not-met'}>8 символів</li>
                                        <li className={passwordValidation.number ? 'requirement-met' : 'requirement-not-met'}>1 число</li>
                                        <li className={passwordValidation.uppercase ? 'requirement-met' : 'requirement-not-met'}>1 буква у верхньому регістрі</li> */}
                                    </ul>
                                </div>
                                {/* <span>{errors.oldPassword?.message as string}</span> */}
                            </div>

                            <div className="input-section">
                                <label htmlFor="newPassword">
                                    Введіть новий пароль:
                                </label>
                                <input
                                    className="password"
                                    type="password"
                                    id="newPassword"
                                    {...register('newPassword', {
                                        required: {
                                            value: true,
                                            message: "Це поле є обов'язковим",
                                        },
                                    })}
                                />
                                {errors.oldPasword && (
                                    <span className="errors">
                                        {errors.oldPassword?.message as string}
                                    </span>
                                )}
                            </div>
                        </div>
                        <button
                            className="submit-button"
                            type="submit"
                            disabled
                        >
                            Зберегти
                        </button>
                    </form>
                </div>

                <div className="role-block">
                    <div className="role-label">Ваша роль:</div>
                    {/* @ts-ignore */}
                    {user ? roleToUkr(user.role) : 'Kek'}
                </div>
            </div>

            <div className="col-2">
                <label
                    className="categories-label"
                    htmlFor="categories"
                    onClick={() =>
                        setIsCategoryListVisible(!isCategoryListVisible)
                    }
                >
                    Доручені вам категорії
                    <Arrow
                        className={`arrow${isCategoryListVisible ? ' arrow-up' : ''}`}
                        arrowStyles={{
                            stroke: 'black',
                            width: '1rem',
                            height: '0.45rem',
                        }}
                    />
                </label>
                {isCategoryListVisible && (
                    <div className="categories-list">
                        <ul>
                            {categories.map((category: any) => (
                                <li key={category.value} value={category.value}>
                                    {category.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </form>
    );
};

export default Settings;
