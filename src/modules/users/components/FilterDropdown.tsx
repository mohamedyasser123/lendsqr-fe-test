import React from 'react';
import './FilterDropdown.scss';

export interface FilterDropdownProps {
  onClose?: () => void;
  filters: {
    organization: string;
    username: string;
    email: string;
    phoneNumber: string;
    status: string;
      date: string;

  };
   onFilterChange: (
    key: string,
    value: string
  ) => void;
  onApply: () => void;
  onReset: () => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({  onClose,
  filters,
  onFilterChange,
  onApply,
  onReset, }) => {
  // Prevent event bubbling when clicking inside the dropdown
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="filter-dropdown" onClick={handleDropdownClick}>
      <form className="filter-dropdown__form" onSubmit={(e) => e.preventDefault()} aria-label="Filter users form">
    <div className="filter-dropdown__field">
  <label htmlFor="filter-org" className="filter-dropdown__label">
    Organization
  </label>

  <select
    id="filter-org"
    className="filter-dropdown__select"
    value={filters.organization}
    onChange={(e) => onFilterChange("organization", e.target.value)}
  >
    <option value="">Select</option>
    <option value="Lendsqr">Lendsqr</option>
    <option value="Irorun">Irorun</option>
    <option value="Lendstar">Lendstar</option>
    <option value="Paystack">Paystack</option>
    <option value="Lendmax">Lendmax</option>
    <option value="Flutterwave">Flutterwave</option>
  </select>
</div>

        <div className="filter-dropdown__field">
          <label htmlFor="filter-user" className="filter-dropdown__label">Username</label>
          <input 
            type="text" 
            id="filter-user"
            value={filters.username}
              onChange={(e) => onFilterChange('username', e.target.value)}
            className="filter-dropdown__input" 
            placeholder="User" 
          />
        </div>

        <div className="filter-dropdown__field">
          <label htmlFor="filter-email" className="filter-dropdown__label">Email</label>
          <input 
            type="email" 
            id="filter-email" 
             value={filters.email}
              onChange={(e) => onFilterChange('email', e.target.value)}
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
  value={filters.date}
  onChange={(e) => onFilterChange("date", e.target.value)}
/>
        </div>

        <div className="filter-dropdown__field">
          <label htmlFor="filter-phone" className="filter-dropdown__label">Phone Number</label>
          <input 
            type="tel" 
            id="filter-phone" 
            value={filters.phoneNumber}
              onChange={(e) => onFilterChange('phoneNumber', e.target.value)}
            className="filter-dropdown__input" 
            placeholder="Phone Number" 
          />
        </div>

        <div className="filter-dropdown__field">
          <label htmlFor="filter-status" className="filter-dropdown__label">Status</label>
<select
  id="filter-status"
  className="filter-dropdown__select"
  value={filters.status}
  onChange={(e) => onFilterChange("status", e.target.value)}
>
            <option value="">Select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
        </div>

        <div className="filter-dropdown__actions">
          <button 
            type="button" 
            className="filter-dropdown__btn filter-dropdown__btn--reset"
            onClick={() => {
              onReset();
              if (onClose) onClose();
            }}
          >
            Reset
          </button>
          <button 
            type="submit" 
            className="filter-dropdown__btn filter-dropdown__btn--filter"
            onClick={() => {
              onApply();
              if (onClose) onClose();
            }}
          >
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterDropdown;
