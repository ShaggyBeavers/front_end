import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './index.css';
import { X } from 'lucide-react';
import CategoryAPI from '../../app/api/Category/category';
import HistoricalPeriodAPI from '../../app/api/HistoricalPeriod/historicalPeriod';
import RegionAPI from '../../app/api/Region/region';
import TechniqueAPI from '../../app/api/Technique/technique';
import PropertyAPI from '../../app/api/Property/property';
import MuseumAPI from '../../app/api/Museum/museum';

const AddTerm = () => {
    const { register, handleSubmit } = useForm();
    const [selectedCategory, setSelectedCategory] =
        useState<string>('Category');
    const [initialRender, setInitialRender] = useState(true);
    const [inputValue, setInputValue] = useState<string>('');
    const [isDestroyed, setIsDestroyed] = useState<boolean>(false);

    useEffect(() => {
        setInitialRender(false);
    }, []);

    const categories = [
        {
            value: 'Category',
            label: 'Категорія',
            terms: Array.from(
                { length: 9 },
                (_, i) => `Category Term ${i + 1}`
            ),
        },
        {
            value: 'Technique',
            label: 'Техніка',
            terms: Array.from(
                { length: 9 },
                (_, i) => `Technique Term ${i + 1}`
            ),
        },
        {
            value: 'HistoricalPeriod',
            label: 'Історичний Період',
            terms: Array.from(
                { length: 9 },
                (_, i) => `Historical Period Term ${i + 1}`
            ),
        },
        {
            value: 'Museum',
            label: 'Музей',
            terms: Array.from({ length: 9 }, (_, i) => `Museum Term ${i + 1}`),
        },
        {
            value: 'Region',
            label: 'Регіон',
            terms: Array.from({ length: 9 }, (_, i) => `Region Term ${i + 1}`),
        },
        {
            value: 'Property',
            label: 'Властивість',
            terms: Array.from(
                { length: 9 },
                (_, i) => `Property Term ${i + 1}`
            ),
        },
    ];

    const handleTabClick = (category: string) => {
        setSelectedCategory(category);
        setInputValue('');
        setIsDestroyed(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleDestroyedChange = () => {
        setIsDestroyed(!isDestroyed);
    };

    const onDeleteEndpoints: { [key: string]: (id: number) => Promise<any> } = {
        Category: CategoryAPI.deleteCategory,
        Technique: TechniqueAPI.deleteTechnique,
        HistoricalPeriod: HistoricalPeriodAPI.deleteHistoricalPeriod,
        Region: RegionAPI.deleteRegion,
        Museum: MuseumAPI.deleteMuseum,
        Property: PropertyAPI.deleteProperty,
    };

    const onSubmit = async (data: any) => {
        console.log(data);
        const selectedTerm = data.term;
        if (selectedCategory === 'Museum') {
            try {
                const response = await MuseumAPI.createMuseum({
                    name: selectedTerm,
                    nameOld: 'dsds',
                    isDestroyed: true,
                });
                console.log(
                    `Successfully added ${selectedTerm} to ${selectedCategory}`
                );
                console.log(response);
            } catch (error) {
                console.error(
                    `Error adding ${selectedTerm} to ${selectedCategory}:`,
                    error
                );
            }
        } else {
            try {
                console.log(`${selectedCategory}API.create${selectedCategory}`);
                const response = await eval(
                    `${selectedCategory}API.create${selectedCategory}({name:${selectedTerm}})`
                );
                console.log(response);
            } catch (error) {
                console.error(
                    `Error adding ${selectedTerm} to ${selectedCategory}:`,
                    error
                );
            }
        }
    };

    const onDelete = async (id: number) => {
        try {
            if (selectedCategory in onDeleteEndpoints) {
                const response = await onDeleteEndpoints[selectedCategory](id);
                console.log(response);
            } else {
                console.error(
                    `Delete function not found for category: ${selectedCategory}`
                );
            }
        } catch (error) {
            console.error(
                `Error deleting ${selectedCategory} with ID ${id}:`,
                error
            );
        }
    };

    return (
        <div className="add-term-con">
            <div className="add-term-categories">
                {categories.map((category) => (
                    <div
                        key={category.value}
                        className={`category ${selectedCategory === category.value ? 'active' : ''} ${initialRender ? 'initial' : ''}`}
                        onClick={() => handleTabClick(category.value)}
                    >
                        {category.label}
                    </div>
                ))}
            </div>
            <div className="tab-content">
                {selectedCategory && (
                    <form
                        className="form-term"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div>
                            <label htmlFor="term">
                                Додати новий {selectedCategory}:
                            </label>

                            <div className="term-input-save">
                                <input
                                    className="term-input"
                                    id="term"
                                    type="term"
                                    {...register('term')}
                                    onChange={handleInputChange}
                                    value={inputValue}
                                />

                                <button className={inputValue ? 'active' : ''}>
                                    Зберегти
                                </button>
                            </div>
                            {selectedCategory === 'Museum' && (
                                <div className='museum_checkbox'>
                                    <label htmlFor="destroyed">
                                        Зруйнований :
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="destroyed"
                                        checked={isDestroyed}
                                        onChange={handleDestroyedChange}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="terms-grid">
                            {categories
                                .find(
                                    (category) =>
                                        category.value === selectedCategory
                                )
                                ?.terms.map((term, index) => (
                                    <div key={index} className="term-item">
                                        <X
                                            size={16}
                                            color="#FA594F"
                                            // onClick={onDelete} that should be redone
                                            className="delete_term"
                                        />
                                        {term}
                                    </div>
                                ))}
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AddTerm;
