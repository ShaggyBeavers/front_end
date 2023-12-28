import React, { useState } from 'react';
import FilterModal from '../FilterModal/filter_modal';
import FilterExpand from '../icons/filter_expand';
import SelFilterExpand from '../icons/sel_filter_expand';
import FilterRelicsLine from '../icons/filter_relics_line';

interface FilterCategoryProps {
    category: string;
    title: string; 
    selectedCategory: string | null;
    handleFilterCategoryClick: (category: string) => void;
    isFilterModalOpen: boolean;
    options: string[];
    selectedFilterOptions: string[];
    handleFilterOptionClick: (option: string) => void;
    setIsFilterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FilterCategory: React.FC<FilterCategoryProps> = ({
    category,
    title,
    selectedCategory,
    handleFilterCategoryClick,
    isFilterModalOpen,
    options,
    selectedFilterOptions,
    handleFilterOptionClick,
    setIsFilterModalOpen
}) => {
    return (
        <li className={selectedCategory === category ? 'selected' : ''}>
            <FilterRelicsLine />
            <div className='filter_inner' onClick={() => handleFilterCategoryClick(category)}>
                <h6>{title}</h6>
                {selectedCategory === category ? <SelFilterExpand /> : <FilterExpand />}
            </div>

            {isFilterModalOpen && selectedCategory === category && (
                <FilterModal
                    options={options} // here will be the result from the endpoint
                    selectedOptions={selectedFilterOptions}
                    onClose={() => {
                        setIsFilterModalOpen(false);
                        handleFilterCategoryClick(category);
                    }}
                    onOptionClick={(option) => handleFilterOptionClick(option)}
                />
            )}
            {category === 'technique' && <FilterRelicsLine />}
        </li>
    );
};
