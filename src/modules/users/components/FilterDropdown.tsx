import React from 'react';
import './FilterDropdown.scss';

export interface FilterDropdownProps {
  onClose?: () => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ onClose }) => {
  // Prevent event bubbling when clicking inside the dropdown
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="filter-dropdown" onClick={handleDropdownClick}>
      <form className="filter-dropdown__form" onSubmit={(e) => e.preventDefault()}>
        <div className="filter-dropdown__field">
          <label htmlFor="filter-org" className="filter-dropdown__label">Organization</label>
          <select id="filter-org" className="filter-dropdown__select" defaultValue="">
            <option value="" disabled hidden>Select</option>
            <option value="lendsqr">Lendsqr</option>
            <option value="irorun">Irorun</option>
            <option value="lendstar">Lendstar</option>
          </select>
        </div>

        <div className="filter-dropdown__field">
          <label htmlFor="filter-user" className="filter-dropdown__label">Username</label>
          <input 
            type="text" 
            id="filter-user" 
            className="filter-dropdown__input" 
            placeholder="User" 
          />
        </div>

        <div className="filter-dropdown__field">
          <label htmlFor="filter-email" className="filter-dropdown__label">Email</label>
          <input 
            type="email" 
            id="filter-email" 
            className="filter-dropdown__input" 
            placeholder="Email" 
          />
        </div>

        <div className="filter-dropdown__field">
          <label htmlFor="filter-date" className="filter-dropdown__label">Date</label>
          <input 
            type="date" 
            id="filter-date" 
            className="filter-dropdown__input-date" 
          />
        </div>

        <div className="filter-dropdown__field">
          <label htmlFor="filter-phone" className="filter-dropdown__label">Phone Number</label>
          <input 
            type="tel" 
            id="filter-phone" 
            className="filter-dropdown__input" 
            placeholder="Phone Number" 
          />
        </div>

        <div className="filter-dropdown__field">
          <label htmlFor="filter-status" className="filter-dropdown__label">Status</label>
          <select id="filter-status" className="filter-dropdown__select" defaultValue="">
            <option value="" disabled hidden>Select</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            <option value="blacklisted">Blacklisted</option>
          </select>
        </div>

        <div className="filter-dropdown__actions">
          <button 
            type="button" 
            className="filter-dropdown__btn filter-dropdown__btn--reset"
            onClick={onClose}
          >
            Reset
          </button>
          <button 
            type="submit" 
            className="filter-dropdown__btn filter-dropdown__btn--filter"
            onClick={onClose}
          >
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterDropdown;
