import React from 'react';
import { EyeIcon, UserXIcon, UserCheckIcon } from './icons';
import './TableActionsMenu.scss';

export interface TableActionsMenuProps {
  onClose: () => void;
  onViewDetails?: () => void;
  onBlacklist?: () => void;
  onActivate?: () => void;
}

export const TableActionsMenu: React.FC<TableActionsMenuProps> = ({
  onClose,
  onViewDetails,
  onBlacklist,
  onActivate
}) => {
  // Prevent propagation to prevent closing issues or raw row clicks
  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleAction = (action?: () => void) => {
    if (action) action();
    onClose();
  };

  return (
    <div className="table-actions-menu" onClick={handleMenuClick}>
      <button 
        type="button" 
        className="table-actions-menu__item"
        onClick={() => handleAction(onViewDetails)}
      >
        <EyeIcon className="table-actions-menu__icon" />
        <span className="table-actions-menu__text">View Details</span>
      </button>

      <button 
        type="button" 
        className="table-actions-menu__item"
        onClick={() => handleAction(onBlacklist)}
      >
        <UserXIcon className="table-actions-menu__icon" />
        <span className="table-actions-menu__text">Blacklist User</span>
      </button>

      <button 
        type="button" 
        className="table-actions-menu__item"
        onClick={() => handleAction(onActivate)}
      >
        <UserCheckIcon className="table-actions-menu__icon" />
        <span className="table-actions-menu__text">Activate User</span>
      </button>
    </div>
  );
};

export default TableActionsMenu;
