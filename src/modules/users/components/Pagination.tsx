import React from 'react';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';
import './Pagination.scss';
interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}
const getPages = (page: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (page <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (page >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", page - 1, page, page + 1, "...", totalPages];
};
export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  totalItems,
  limit,
  onPageChange,
  onLimitChange,
}) => {
  return (
    <div className="pagination">
      <div className="pagination__left">
        <span className="pagination__showing-text">Showing</span>
        <div className="pagination__select-wrapper">
          <select className="pagination__select" value={limit} onChange={(e) => onLimitChange(Number(e.target.value))}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <ChevronDownIcon className="pagination__select-icon" />
        </div>
        <span className="pagination__showing-text">out of {totalItems}</span>
      </div>

      <div className="pagination__right">
        <button type="button" className="pagination__btn pagination__btn--prev" aria-label="Previous page"
         disabled={page === 1}
  onClick={() => onPageChange(page - 1)}>
          <ChevronLeftIcon />
        </button>

        {getPages(page, totalPages).map((item, index) =>
          item === '...' ? (
            <span key={`ellipsis-${index}`} className="pagination__ellipsis">
              ...
            </span>
          ) : (
            <button
              key={`page-${item}`}
              type="button"
              className={`pagination__page ${
                page === item ? 'pagination__page--active' : ''
              }`}
              onClick={() => onPageChange(item as number)}
            >
              {item}
            </button>
          )
        )}
        <button type="button" className="pagination__btn pagination__btn--next" aria-label="Next page"
         disabled={page === totalPages}
  onClick={() => onPageChange(page + 1)}>
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
