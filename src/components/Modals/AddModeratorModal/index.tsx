import { useForm } from 'react-hook-form';
import './index.css';
import Select from 'react-select';
import DefaultButton from '../../DefaultButton/defaultbutton';

const AddModeratorModal = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

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

    return (
        <>
            <form className="center-mod" onSubmit={handleSubmit(onSubmit)}>
                <div className="row-mod">
                    <label htmlFor="email">
                        Введіть пошту нового модератора:
                    </label>
                    <input
                        className="mod-input"
                        id="email"
                        type="email"
                        {...register('email')}
                    />
                </div>
                <div className="row-mod">
                    <label htmlFor="region">Виберіть регіон модератора:</label>
                    <Select
                        className="select"
                        options={regions}
                        menuPortalTarget={document.body}
                        styles={{
                            // menuPortal: (base) => ({...base, zIndex: 9999}),
                            menu: (provided) => ({
                                ...provided,
                                maxHeight: 180,
                                overflow: 'hidden',
                            }),
                        }}
                        theme={(theme) => ({
                            ...theme,
                            border: 'none',
                            borderRadius: 20,
                            fontSize: 10,
                            colors: {
                                ...theme.colors,
                                primary25: 'rgba(0, 0, 0, 0.1)',
                                primary: '#1C1C1C',
                            },
                        })}
                    />
                </div>
                <div className="row-mod">
                    <label htmlFor="categories">
                        Виберіть категорії модератора:
                    </label>
                    <Select
                        className="select"
                        isMulti
                        options={categories}
                        closeMenuOnSelect={false}
                        menuPortalTarget={document.body}
                        styles={{
                            // menuPortal: (base) => ({...base, zIndex: 9999}),
                            menu: (provided) => ({
                                ...provided,
                                maxHeight: 180,
                                overflow: 'hidden',
                            }),
                        }}
                        theme={(theme) => ({
                            ...theme,
                            border: 'none',
                            borderRadius: 20,
                            fontSize: 10,
                            colors: {
                                ...theme.colors,
                                primary25: 'rgba(0, 0, 0, 0.1)',
                                primary: '#1C1C1C',
                            },
                        })}
                    />
                </div>
                <div className="row-mod">
                    <DefaultButton 
                        height={40}
                        width={180}
                        bgcolor='black'
                        color='white'
                        text="Додати модератора"
                        action={() => {console.log('add moderator')}}
                    />
                </div>
            </form>
        </>
    );
};

export default AddModeratorModal;
