import React from 'react';
import './filter_modal.css';

interface FilterModalProps {
    options: string[];
    selectedOptions: string[];
    onClose: () => void;
    onOptionClick: (option: string) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
    options,
    selectedOptions = [],
    onClose,
    onOptionClick,
}) => {
    const handleClearFilters = () => {
        onOptionClick('clear');
    };

    const statusOptions = [
        { value: 'DESTROYED', label: 'Знищено' },
        { value: 'STOLEN', label: 'Вкрадено' },
        { value: 'RETURNED', label: 'Повернуто' },
        { value: 'UNKNOWN', label: 'Невідомо' },
    ];

    return (
        <div className="filter-modal">
            <div className="filter-options">
                {options.map((option) => (
                    <div
                        key={option}
                        onClick={() => onOptionClick(option)}
                        className={
                            selectedOptions.includes(option) ||
                            selectedOptions.some((selectedOption) => {
                                const selectedLabel = statusOptions.find(
                                    ({ value }) => value === selectedOption
                                )?.label;
                                return selectedLabel === option;
                            })
                                ? 'selected'
                                : ''
                        }
                    >
                        {option}
                    </div>
                ))}
            </div>
            <div className="filter-btns">
                <a onClick={handleClearFilters}>Очистити</a>
                <button onClick={onClose}>Готово</button>
            </div>
        </div>
    );
};

export default FilterModal;
