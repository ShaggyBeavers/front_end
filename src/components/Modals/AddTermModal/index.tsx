import './index.css';
import Select from 'react-select';
import DefaultButton from '../../DefaultButton/defaultbutton';
import { useForm } from 'react-hook-form';

const AddTermModal = () => {
    const { register, handleSubmit } = useForm();

    const categories = [
        { value: 'category', label: 'Категорія' },
        { value: 'technique', label: 'Техніка' },
        { value: 'historicalPeriod', label: 'Історичний Період' },
        { value: 'material', label: 'Матеріал' },
        { value: 'term', label: 'Термін' },
        { value: 'author', label: 'Автор' },
    ];

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <>
            <form className="center-term" onSubmit={handleSubmit(onSubmit)}>
                <div className="row-mod">
                    <label htmlFor="categories">Виберіть категорію:</label>
                    <Select
                        className="select"
                        options={categories}
                        menuPortalTarget={document.body}
                        styles={{
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
                    <label htmlFor="term">Введіть новий термін для неї:</label>
                    <input
                        className="mod-input"
                        id="term"
                        type="term"
                        {...register('term')}
                    />
                </div>
                <div className="row-mod">
                    <DefaultButton
                        height={40}
                        width={180}
                        bgcolor="black"
                        color="white"
                        text="Додати"
                        action={() => {
                            console.log('add term');
                        }}
                    />
                </div>
            </form>
        </>
    );
};

export default AddTermModal;
