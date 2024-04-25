import React from 'react';
import './filter_modal.css';
import { CheckIcon } from '@radix-ui/react-icons';
import { Divide } from 'lucide-react';

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

    const isOptionSelected = (option: string) => {
        if (selectedOptions.includes(option)) {
            return true;
        }

        const isStatusOptionSelected = selectedOptions.some(
            (selectedOption) => {
                const selectedLabel = statusOptions.find(
                    ({ value }) => value === selectedOption
                )?.label;
                return selectedLabel === option;
            }
        );

        return isStatusOptionSelected;
    };
    return (
        <div className="filter-modal">
            <div className="filter-options">
                {options.map((option) => (
                    <div
                        key={option}
                        onClick={() => onOptionClick(option)}
                        className={isOptionSelected(option) ? 'selected' : ''}
                    >
                        <p>{option}</p>
                        {isOptionSelected(option) ? (
                            <CheckIcon
                                style={{
                                    color: '4b8bfa',
                                    width: 17,
                                    height: 17,
                                }}
                            />
                        ) : (
                            <div />
                        )}
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
