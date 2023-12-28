import React from 'react';
import './filter_modal.css';

interface FilterModalProps {
  options: string[];
  selectedOptions: string[];
  onClose: () => void;
  onOptionClick: (option: string) => void;
  style?: React.CSSProperties;
}

const FilterModal: React.FC<FilterModalProps> = ({
  options,
  selectedOptions,
  onClose,
  onOptionClick,
}) => {
  const handleClearFilters = () => {
    onOptionClick('clear');
  };
  return (
    <div className="filter-modal">
      <div className="filter-options">
        {options.map((option) => (
          <div
            key={option}
            onClick={() => onOptionClick(option)}
            className={selectedOptions.includes(option) ? 'selected' : ''}
          >
            {option}
          </div>
        ))}
      </div>
      <div className='filter-btns'>
        <a onClick={handleClearFilters} >Очистити</a>
        <button onClick={onClose} >Готово</button>
        </div>
    </div>
  );
};

export default FilterModal;
