import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import './index.css';
import Arrow from '../../Arrow';
import EditIcon from '../../EditIcon';

const Settings = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isCategoryListVisible, setIsCategoryListVisible] =
        React.useState(false);

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
    ];

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <form className="table-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-section">
                <label htmlFor="firstName">Ваше ім'я:</label>
                <div className="input-row">
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        {...register('firstName', { required: true })}
                    />
                    <EditIcon />
                </div>
                {errors.firstName && <span>Це поле є обов'язковим</span>}
            </div>

            <div className="input-section">
                <label htmlFor="lastName">Ваше прізвище:</label>
                <input
                    type="text"
                    id="lastName"
                    {...register('lastName', { required: true })}
                />
                <EditIcon />
                {errors.lastName && <span>Це поле є обов'язковим</span>}
            </div>

            <div className="input-section">
                <label htmlFor="region">Ваш регіон:</label>
                <select id="region" {...register('region', { required: true })}>
                    {regions.map((region) => (
                        <option key={region.value} value={region.value}>
                            {region.label}
                        </option>
                    ))}
                </select>
                {errors.region && <span>Це поле є обов'язковим</span>}
            </div>

            <div className="input-section">
                <label htmlFor="oldPassword">Введіть старий пароль:</label>
                <input
                    type="password"
                    id="oldPassword"
                    {...register('oldPassword', { required: true })}
                />
                {errors.oldPassword && <span>Це поле є обов'язковим</span>}
            </div>

            <div className="input-section">
                <label htmlFor="newPassword">Введіть новий пароль:</label>
                <input
                    type="password"
                    id="newPassword"
                    {...register('newPassword', { required: true })}
                />
            </div>

            <label
                className="categories-label"
                htmlFor="categories"
                onClick={() => setIsCategoryListVisible(!isCategoryListVisible)}
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
                <div className="box-categories">
                    <div className="categories-list">
                        <ul>
                            {categories.map((category) => (
                                <li key={category.value} value={category.value}>
                                    {category.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <div className="role-label">Ваша роль:</div>
            {role}

            {/* button to save changes */}
            <button type="submit">Зберегти</button>
        </form>
    );
};

export default Settings;
