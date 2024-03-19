import './index.css';
import Select from 'react-select';
import DefaultButton from '../../DefaultButton/defaultbutton';
import { useForm } from 'react-hook-form';
import CategoryAPI from '../../../app/api/Category/category';
import HistoricalPeriodAPI from '../../../app/api/HistoricalPeriod/historicalPeriod';
import RegionAPI from '../../../app/api/Region/region';
import TechniqueAPI from '../../../app/api/Technique/technique';

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

    const endpoints: { [key: string]: (name: string) => Promise<any> } = {
        category: CategoryAPI.createCategory,
        technique: TechniqueAPI.createTechnique,
        historicalPeriod: HistoricalPeriodAPI.createHistoricalPeriod,
        region: RegionAPI.createRegion,
    };

    const onSubmit = (data: any) => {
        console.log(data);
        categories.forEach((category) => {
            if (category.value in data) {
                const check = 'technique'
                console.log(
                    `Adding ${data[category.value]} to ${category.value}`
                );
                console.log(
                    `Using endpoint: ${endpoints['${check}']}`
                );
            }
        });
    };

    return (
        <>
            <form className="center-term" onSubmit={handleSubmit(onSubmit)}>
                <div className="row-mod">
                    <label htmlFor="categories">Категорія:</label>
                    
                    <Select
                        className="select"
                        options={categories}
                        placeholder={'Виберіть категорію'}
                        menuPortalTarget={document.body}
                        styles={{
                            menu: (provided) => ({
                                ...provided,
                                // maxHeight: 180,
                                // overflow: 'hidden',
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
                        action={() => {}}
                    />
                </div>
            </form>
        </>
    );
};

export default AddTermModal;
