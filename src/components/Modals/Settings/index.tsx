import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import './index.css';
import Arrow from '../../Arrow';
import EditIcon from '../../EditIcon';
import { useAuthStore } from '../../../stores/AuthStore';
import { roleToUkr } from '../../../types/role';

const Settings = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const [isCategoryListVisible, setIsCategoryListVisible] =
        React.useState(false);

    const user = useAuthStore((state) => state.user);

    const password = watch('oldPassword', '');

    const passwordValidation = {
        length: password.length >= 8,
        number: /\d/.test(password),
        uppercase: /[A-Z]/.test(password),
    };

    const firstName = 'Іван';
    const lastName = 'Бобрар';
    const role = 'Модератор';

    const categories = [
        { value: 'architecture', label: 'Архітектура' },
        { value: 'history', label: 'Історія' },
        { value: 'nature', label: 'Природа' },
        { value: 'culture', label: 'Культура' },
        { value: 'religion', label: 'Релігія' },
        { value: 'military', label: 'Військовість' },
        { value: 'science', label: 'Наука' },
        { value: 'art', label: 'Мистецтво' },
        { value: 'sport', label: 'Спорт' },
        { value: 'other', label: 'Інше' },
    ];
    const regions = [
        { value: 'Kyiv', label: 'Київ' },
        { value: 'Kharkiv', label: 'Харків' },
        { value: 'Odesa', label: 'Одеса' },
        { value: 'Dnipro', label: 'Дніпро' },
        { value: 'Donetsk', label: 'Донецьк' },
        { value: 'Zaporizhzhia', label: 'Запоріжжя' },
        { value: 'Lviv', label: 'Львів' },
        { value: 'Kryvyi Rih', label: 'Кривий Ріг' },
        { value: 'Mykolaiv', label: 'Миколаїв' },
        { value: 'Volyn', label: 'Волинь' },
        { value: 'Стара Біла Церква', label: 'Стара Біла Церква' },
    ];

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <form className="table-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-1">
                <div className="info-block">
                    <div className="input-section">
                        <label htmlFor="firstName">Ваше ім'я:</label>
                        <div className="input-row">
                            <input
                                type="text"
                                id="firstName"
                                placeholder={user.firstName}
                                {...register('firstName', { required: true })}
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
                                value={user.lastName || ''}
                                {...register('lastName', { required: true })}
                            />
                            <EditIcon />
                        </div>
                        {errors.lastName && <span>Це поле є обов'язковим</span>}
                    </div>

                    <div className="input-section">
                        {/* <label htmlFor="region">Ваш регіон:</label>
                        <div className="input-row">
                            <select
                                id="region"
                                disabled
                                {...register('region', {
                                    required: {
                                        value: true,
                                        message: "Це поле є обов'язковим",
                                    },
                                })}
                            >
                                {regions.map((region) => (
                                    <option
                                        key={region.value}
                                        value={region.value}
                                    >
                                        {region.label}
                                    </option>
                                ))}
                            </select>
                        </div> */}
                        {/* {errors.region && <span>Це поле є обов'язковим</span>} */}
                    </div>

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
                            {categories.map((category) => (
                                <li key={category.value} value={category.value}>
                                    {category.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button className="submit-button" type="submit">
                    Зберегти
                </button>
            </div>
        </form>
    );
};

export default Settings;
