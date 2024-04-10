import React from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import './index.css';
import Arrow from '../../Arrow';
import EditIcon from '../../EditIcon';
import { useAuthStore } from '../../../stores/AuthStore';
import { roleToUkr } from '../../../types/role';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import UserAPI from '../../../../src/app/api/Account/User/user';
import ProtectedItems from '../../ProtectedItems';
import { RoleEnum } from '../../../../src/enums/roles';

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
        formState: { errors, isValid, isDirty },
        watch,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            firstName: userProfile.data?.data.firstName,
            lastName: userProfile.data?.data.lastName,
        },
    });

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2, isValid: isValid2, isDirty: isDirty2 },
        watch: watch2,
        getValues: getValues2,
    } = useForm({
        mode: 'onBlur',
    });

    const [isCategoryListVisible, setIsCategoryListVisible] =
        React.useState(false);
    const [isRegionListVisible, setIsRegionListVisible] = React.useState(false);

    const user = useAuthStore((state) => state.user) || {};

    const password = watch2('oldPassword', '');

    const passwordValidation = {
        length: password.length >= 8,
        number: /\d/.test(password),
        uppercase: /[A-Z]/.test(password),
    };

    const firstName = 'Іван';
    const lastName = 'Бобрар';
    const role = 'Модератор';

    const onSubmitEmailName: SubmitHandler<any> = (
        data: any,
        e?: React.BaseSyntheticEvent
    ) => {
        e?.preventDefault();
        const email = userProfile.data?.data.email;
        const firstName = data.firstName || userProfile.data?.data.firstName;
        const lastName = data.lastName || userProfile.data?.data.lastName;
        // console.log(data);

        if (data.firstName || data.lastName) {
            editUser.mutate({
                email,
                firstName,
                lastName,
            });
        }
    };

    const onSubmitPassword = (data: any, e?: React.BaseSyntheticEvent) => {
        e?.preventDefault();
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

    interface Region {
        id: string;
        name: string;
    }
    const categories: Region[] = userData.categories;
    const regions = userData.regions;

    return (
        <div className="table-form">
            <div className="col-1">
                <div className="inputs">
                    <form
                        key={1}
                        onSubmit={handleSubmit(onSubmitEmailName)}
                        className="info-block"
                    >
                        <div className="input-section">
                            <label htmlFor="firstName">Ваше ім'я:</label>
                            <div className="input-row">
                                <input
                                    type="text"
                                    id="firstName"
                                    placeholder={userData.firstName}
                                    {...register('firstName', {
                                        minLength: {
                                            value: 1,
                                            message: 'Мінімум 1 символ',
                                        },
                                        validate: {
                                            hasCharacter: (value) => {
                                                return value.match(
                                                    /[a-zA-Zа-яА-Я]/g
                                                )
                                                    ? true
                                                    : "Ім'я повинно містити тільки букви";
                                            },
                                        },
                                    })}
                                />
                                <EditIcon />
                            </div>
                            {errors.firstName && (
                                <span>
                                    {errors.firstName.message as string}
                                </span>
                            )}
                        </div>

                        <div className="input-section">
                            <label htmlFor="lastName">Ваше прізвище:</label>
                            <div className="input-row">
                                <input
                                    type="text"
                                    id="lastName"
                                    placeholder={userData.lastName || ''}
                                    {...register('lastName', {
                                        minLength: {
                                            value: 1,
                                            message: 'Мінімум 1 символи',
                                        },
                                        validate: {
                                            hasCharacter: (value) => {
                                                return value.match(
                                                    /[a-zA-Zа-яА-Я]/g
                                                )
                                                    ? true
                                                    : 'Прізвище повинно містити тільки букви';
                                            },
                                        },
                                    })}
                                />
                                <EditIcon />
                            </div>
                            {errors.lastName && (
                                <span>{errors.lastName.message as string}</span>
                            )}
                        </div>
                        <button
                            disabled={!isDirty || !isValid}
                            className={`submit-button ${(!isDirty || !isValid) && 'hidden'}`}
                            type="submit"
                        >
                            Зберегти
                        </button>
                    </form>

                    <form
                        key={2}
                        className="info-block"
                        onSubmit={handleSubmit2(onSubmitPassword)}
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
                                    {...register2('oldPassword', {
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
                                {errors2.oldPassword && (
                                    <span className="errors">
                                        {/* {errors2.oldPassword?.message as string} */}
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
                                {/* <span>{errors2.oldPassword?.message as string}</span> */}
                            </div>

                            <div className="input-section">
                                <label htmlFor="newPassword">
                                    Введіть новий пароль:
                                </label>
                                <input
                                    className="password"
                                    type="password"
                                    id="newPassword"
                                    {...register2('newPassword', {
                                        required: {
                                            value: true,
                                            message: "Це поле є обов'язковим",
                                        },
                                        validate: {
                                            samePassword: (value) => {
                                                const { oldPassword } =
                                                    getValues2();
                                                return (
                                                    value === oldPassword ||
                                                    'Паролі повинні співпадати'
                                                );
                                            },
                                        },
                                    })}
                                />
                                {errors2.oldPasword && (
                                    <span className="errors">
                                        {errors2.oldPassword?.message as string}
                                    </span>
                                )}
                            </div>
                        </div>
                        <button
                            disabled={!isValid2 || !isDirty2}
                            className={`submit-button ${(!isDirty2 || !isValid2) && 'hidden'}`}
                            type="submit"
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
                <ProtectedItems
                    role={[
                        RoleEnum.ADMIN,
                        RoleEnum.REGIONAL_MODERATOR,
                        RoleEnum.MODERATOR,
                    ]}
                >
                    <label
                        className="categories-label"
                        htmlFor="categories"
                        onClick={() => {
                            setIsCategoryListVisible(!isCategoryListVisible);
                            setIsRegionListVisible(false);
                        }}
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
                                    <li
                                        key={category.id}
                                        value={category.value}
                                    >
                                        {category.value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <label
                        className="categories-label"
                        htmlFor="categories"
                        onClick={() => {
                            setIsRegionListVisible(!isRegionListVisible);
                            setIsCategoryListVisible(false);
                        }}
                    >
                        Доручені вам регіони
                        <Arrow
                            className={`arrow${isRegionListVisible ? ' arrow-up' : ''}`}
                            arrowStyles={{
                                stroke: 'black',
                                width: '1rem',
                                height: '0.45rem',
                            }}
                        />
                    </label>
                    {isRegionListVisible && (
                        <div className="regions-list">
                            <ul>
                                {regions.map((region: any) => (
                                    <li key={region.id} value={region.name}>
                                        {region.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </ProtectedItems>
            </div>
        </div>
    );
};

export default Settings;
