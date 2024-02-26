import React, { useState } from 'react';
import FilterModal from '../FilterModal/filter_modal';
import FilterExpand from '../icons/filter_expand';
import SelFilterExpand from '../icons/sel_filter_expand';
import FilterRelicsLine from '../icons/filter_relics_line';
import { Filters } from '../Catalogue/catalogue';

interface FilterCategoryProps {
    category: string;
    title: string;
    selectedCategory: string | null;
    handleFilterCategoryClick: (category: string) => void;
    isFilterModalOpen: boolean;
    options: string[];
    selectedFilterOptions: Filters;
    handleFilterOptionClick: (option: string, category: string) => void;
    setIsFilterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    applyFilters: () => void;
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
    setIsFilterModalOpen,
    applyFilters,
}) => {
    const selectedOptionsForCategory = selectedFilterOptions[category];

    return (
        <li className={selectedCategory === category ? 'selected' : ''}>
            <FilterRelicsLine />
            <div
                className="filter_inner"
                onClick={() => handleFilterCategoryClick(category)}
            >
                <h6>{title}</h6>
                {selectedCategory === category ? (
                    <SelFilterExpand />
                ) : (
                    <FilterExpand />
                )}
            </div>

            {isFilterModalOpen && selectedCategory === category && (
                <FilterModal
                    options={options} // here will be the result from the endpoint
                    selectedOptions={selectedOptionsForCategory}
                    onClose={() => {
                        applyFilters();
                        setIsFilterModalOpen(false);
                        handleFilterCategoryClick(category);
                    }}
                    onOptionClick={(option) =>
                        handleFilterOptionClick(option, category)
                    }
                />
            )}
            {category === 'technique' && <FilterRelicsLine />}
        </li>
    );
};
