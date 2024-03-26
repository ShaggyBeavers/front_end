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

interface Term {
    id: number;
    name: string;
}

interface MuseumTerm extends Term {
    isDestroyed: boolean;
    OldName: string;
}

const AddTerm = () => {
    const { register, handleSubmit } = useForm();
    const [selectedCategory, setSelectedCategory] =
        useState<string>('Category');
    const [initialRender, setInitialRender] = useState(true);
    const [inputValue, setInputValue] = useState<string>('');
    const [isDestroyed, setIsDestroyed] = useState<boolean>(false);
    const [terms, setTerms] = useState<(Term | MuseumTerm)[]>([]);

    useEffect(() => {
        fetchTerms(selectedCategory);
    }, []);

    useEffect(() => {
        if (!initialRender) {
            fetchTerms(selectedCategory);
        } else {
            setInitialRender(false);
        }
    }, [selectedCategory]);

    const categories = [
        {
            value: 'Category',
            label: 'Категорія',
        },
        {
            value: 'Technique',
            label: 'Техніка',
        },
        {
            value: 'HistoricalPeriod',
            label: 'Історичний Період',
        },
        {
            value: 'Museum',
            label: 'Музей',
        },
        {
            value: 'Region',
            label: 'Регіон',
        },
        {
            value: 'Property',
            label: 'Властивість',
        },
    ];

    const onGetEndpoints: { [key: string]: () => Promise<any> } = {
        Category: CategoryAPI.getCategories,
        Technique: TechniqueAPI.getTechniques,
        HistoricalPeriod: HistoricalPeriodAPI.getHistoricalPeriods,
        Region: RegionAPI.getRegions,
        Museum: MuseumAPI.getMuseums,
        Property: PropertyAPI.getProperties,
    };

    const onDeleteEndpoints: { [key: string]: (id: number) => Promise<any> } = {
        Category: CategoryAPI.deleteCategory,
        Technique: TechniqueAPI.deleteTechnique,
        HistoricalPeriod: HistoricalPeriodAPI.deleteHistoricalPeriod,
        Region: RegionAPI.deleteRegion,
        Museum: MuseumAPI.deleteMuseum,
        Property: PropertyAPI.deleteProperty,
    };

    const onCreateEndpoints: { [key: string]: (value:{ name: string }) => Promise<any> } = {
        Category: CategoryAPI.createCategory,
        Technique: TechniqueAPI.createTechnique,
        HistoricalPeriod: HistoricalPeriodAPI.createHistoricalPeriod,
        Region: RegionAPI.createRegion,
        Property: PropertyAPI.createProperty,
    };

    const fetchTerms = async (category: string) => {
        try {
            const response = await onGetEndpoints[category]();
            if (category === 'Museum') {
                setTerms(
                    response.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        isDestroyed: item.isDestroyed,
                        OldName: item.OldName,
                    }))
                );
            } else {
                setTerms(
                    response.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                    }))
                );
            }
        } catch (error) {
            console.error(`Error fetching terms for ${category}:`, error);
        }
    };

    const onSubmit = async (data: any) => {
        const selectedTerm = data.term;
        if (selectedCategory === 'Museum') {
            try {
                await MuseumAPI.createMuseum({
                    name: selectedTerm,
                    nameOld: 'we dont have design :)))',
                    isDestroyed: isDestroyed,
                });
                fetchTerms(selectedCategory);
                setInputValue('');
            } catch (error) {
                console.error(
                    `Error adding ${selectedTerm} to ${selectedCategory}:`,
                    error
                );
            }
        } else {
            try {
                await onCreateEndpoints[selectedCategory]({ name: selectedTerm });
                fetchTerms(selectedCategory);
                setInputValue('');
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
                await onDeleteEndpoints[selectedCategory](id);
                fetchTerms(selectedCategory);
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
                            <label htmlFor="term">Додати новий термін:</label>

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
                                <div className="museum_checkbox">
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
                            {terms.map((term) => (
                                <div key={term.id} className="term-item">
                                    <X
                                        size={16}
                                        color="#FA594F"
                                        onClick={() => onDelete(term.id)}
                                        className="delete_term"
                                    />
                                    {term.name}
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
