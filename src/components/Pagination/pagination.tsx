import './pagination.css';
import React from 'react';
import { HashLink } from 'react-router-hash-link';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  topRef: string
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange, topRef }) => {
  return (
    <div className="pagination-container">
      <div>
        {currentPage !== 1 && (
          <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            &#8592; Назад
          </button>
        )}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        {currentPage !== totalPages && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Далі &#8594;
          </button>
        )}
      </div>
      <div className='to_top'><HashLink smooth to={`#${topRef}`}>Перейти до гори</HashLink></div>
    </div>
  );
};

export default Pagination;
