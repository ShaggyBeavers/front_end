import React, { useState } from 'react';
import DefaultButton from '../../DefaultButton/defaultbutton';
import { useForm } from 'react-hook-form';

import './index.css';
import { X } from 'lucide-react';
import CategoryAPI from '../../../app/api/Category/category';
import HistoricalPeriodAPI from '../../../app/api/HistoricalPeriod/historicalPeriod';
import RegionAPI from '../../../app/api/Region/region';
import TechniqueAPI from '../../../app/api/Technique/technique';


interface AddTermModalProps {
    onClose: () => void;
}

const AddTermModal: React.FC<AddTermModalProps> = ({ onClose }) => {
    const { register, handleSubmit } = useForm();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );

    const categories = [
        {
            value: 'category',
            label: 'Категорія',
            terms: Array.from(
                { length: 9 },
                (_, i) => `Category Term ${i + 1}`
            ),
        },
        {
            value: 'technique',
            label: 'Техніка',
            terms: Array.from(
                { length: 9 },
                (_, i) => `Technique Term ${i + 1}`
            ),
        },
        {
            value: 'historicalPeriod',
            label: 'Історичний Період',
            terms: Array.from(
                { length: 9 },
                (_, i) => `Historical Period Term ${i + 1}`
            ),
        },
        {
            value: 'material',
            label: 'Матеріал',
            terms: Array.from(
                { length: 9 },
                (_, i) => `Material Term ${i + 1}`
            ),
        },
        {
            value: 'term',
            label: 'Термін',
            terms: Array.from({ length: 9 }, (_, i) => `Term Term ${i + 1}`),
        },
    ];

    const handleTabClick = (category: string) => {
        setSelectedCategory(category);
      
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
        <div className="add-term-con">
            <div className="add-term-categories">
                {categories.map((category) => (
                    <div
                        key={category.value}
                        className={`category ${selectedCategory === category.value? 'active' : ''}`}
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
                                />
                                <button>Зберегти</button>
                            </div>
                        </div>
                        <div className="terms-grid">
                            {categories
                                .find(
                                    (category) =>
                                        category.value === selectedCategory
                                )
                                ?.terms.map((term, index) => (
                                    <div key={index} className="term-item">
                                        <X size={16} color="#FA594F" />
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

export default AddTermModal;
