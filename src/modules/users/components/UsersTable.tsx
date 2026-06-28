import React, { useState, useEffect, useRef, memo } from 'react';
import { FilterIcon, ThreeDotsIcon } from './icons';
import FilterDropdown from './FilterDropdown';
import TableActionsMenu from './TableActionsMenu';
import './UsersTable.scss';
import type { User } from "../types/user.types";
import { useNavigate } from 'react-router-dom';

// Module-level constants — no re-creation on each render
const SKELETON_ROW_INDICES = Array.from({ length: 6 }, (_, i) => i);

const TABLE_HEADERS = [
  'Organization',
  'Username',
  'Email',
  'Phone Number',
  'Date Joined',
  'Status',
];

const getStatusClass = (status: string): string => {
  switch (status) {
    case 'Active':      return 'users-table__status--active';
    case 'Inactive':    return 'users-table__status--inactive';
    case 'Pending':     return 'users-table__status--pending';
    case 'Blacklisted': return 'users-table__status--blacklisted';
    default:            return '';
  }
};

export interface UsersTableProps {
  state: 'default' | 'loading' | 'empty' | 'error';
  users: User[];
    filters: {
    organization: string;
    username: string;
    email: string;
    phoneNumber: string;
    status: string;
    date: string;
  };

  onFilterChange: (key: string, value: string) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  onRetry?: () => void;
}

interface HeaderCellProps {
  label: string;
  index: number;
  activeFilterIndex: number | null;
  setActiveFilterIndex: (index: number | null) => void;
   filters: UsersTableProps["filters"];
  onFilterChange: UsersTableProps["onFilterChange"];
  onApplyFilters: UsersTableProps["onApplyFilters"];
  onResetFilters: UsersTableProps["onResetFilters"];
}

const TableHeaderCell: React.FC<HeaderCellProps> = ({ 
  label, 
  index, 
  activeFilterIndex, 
  setActiveFilterIndex,
  filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isOpen = activeFilterIndex === index;

  const toggleFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveFilterIndex(isOpen ? null : index);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveFilterIndex(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isOpen, setActiveFilterIndex]);

  return (
    <th className="users-table__th">
      <div className="users-table__header-cell-container" ref={containerRef}>
        <span className="users-table__header-label">{label}</span>
        <button 
          type="button" 
          className={`users-table__filter-btn ${isOpen ? 'users-table__filter-btn--active' : ''}`}
          onClick={toggleFilter}
          aria-label={`Filter by ${label}`}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <FilterIcon />
        </button>
{isOpen && (
  <FilterDropdown
    filters={filters}
    onFilterChange={onFilterChange}
    onApply={onApplyFilters}
    onReset={onResetFilters}
    onClose={() => setActiveFilterIndex(null)}
  />
)}      </div>
    </th>
  );
};

// Table Row Sub-component
interface TableRowProps {
  user: User;
  activeMenuRowId: string | null;
  setActiveMenuRowId: (id: string | null) => void;
}

const TableRow: React.FC<TableRowProps> = ({ 
  user, 
  activeMenuRowId, 
  setActiveMenuRowId 
}) => {
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const isMenuOpen = activeMenuRowId === user.id;
const navigate = useNavigate();
  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenuRowId(isMenuOpen ? null : user.id);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isMenuOpen && menuContainerRef.current && !menuContainerRef.current.contains(event.target as Node)) {
        setActiveMenuRowId(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isMenuOpen, setActiveMenuRowId]);


  return (
    <tr className="users-table__tr">
      <td className="users-table__td">{user.organization}</td>
      <td className="users-table__td users-table__td--username">{user.username}</td>
      <td className="users-table__td">{user.email}</td>
      <td className="users-table__td">{user.phoneNumber}</td>
      <td className="users-table__td">{new Date(user.createdAt).toLocaleDateString()}</td>
      <td className="users-table__td">
        <span className={`users-table__status ${getStatusClass(user.status)}`}>
          {user.status}
        </span>
      </td>
      <td className="users-table__td users-table__td--action">
        <div className="users-table__action-container" ref={menuContainerRef}>
          <button 
            type="button" 
            className={`users-table__action-btn ${isMenuOpen ? 'users-table__action-btn--active' : ''}`}
            onClick={toggleMenu}
            aria-label="User actions menu"
          >
            <ThreeDotsIcon />
          </button>
          {isMenuOpen && (
       <TableActionsMenu
  onClose={() => setActiveMenuRowId(null)}
  onViewDetails={() => navigate(`/users/${user.id}`)}
  onBlacklist={() => {
  }}
  onActivate={() => {
  }}
/>
          )}
        </div>
      </td>
    </tr>
  );
};

// Wrap in memo — only re-renders when its own user/menu state changes,
// not when other rows open/close their menus
const TableRowMemo = memo(TableRow);

// Skeleton Loader Sub-component
const TableSkeleton: React.FC = () => {
  return (
    <>
      {SKELETON_ROW_INDICES.map((index) => (
        <tr key={index} className="users-table__tr users-table__tr--skeleton">
          <td className="users-table__td"><div className="skeleton-bar" /></td>
          <td className="users-table__td"><div className="skeleton-bar" /></td>
          <td className="users-table__td"><div className="skeleton-bar" /></td>
          <td className="users-table__td"><div className="skeleton-bar" /></td>
          <td className="users-table__td"><div className="skeleton-bar" /></td>
          <td className="users-table__td"><div className="skeleton-bar skeleton-bar--status" /></td>
          <td className="users-table__td"><div className="skeleton-circle" /></td>
        </tr>
      ))}
    </>
  );
};

// Main UsersTable Component
export const UsersTable: React.FC<UsersTableProps> = ({ state, users, filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
  onRetry,
 }) => {
  const [activeFilterIndex, setActiveFilterIndex] = useState<number | null>(null);
  const [activeMenuRowId, setActiveMenuRowId] = useState<string | null>(null);


  return (
    <div className="users-table-wrapper">
      <div className="users-table-container">
        <table className="users-table" role="table" aria-label="Users list">
          <thead className="users-table__thead">
            <tr className="users-table__header-tr">
              {TABLE_HEADERS.map((label, idx) => (
                <TableHeaderCell 
                  key={label}
                  label={label}
                  index={idx}
                  activeFilterIndex={activeFilterIndex}
                  setActiveFilterIndex={setActiveFilterIndex}
                   filters={filters}
  onFilterChange={onFilterChange}
  onApplyFilters={onApplyFilters}
  onResetFilters={onResetFilters}
                  
                />
              ))}
              <th className="users-table__th users-table__th--action"></th>
            </tr>
          </thead>
          <tbody className="users-table__tbody">
            {state === 'loading' && <TableSkeleton />}

            {state === 'default' && users.map((user) => (
            <TableRowMemo 
                key={user.id}
                user={user}
                activeMenuRowId={activeMenuRowId}
                setActiveMenuRowId={setActiveMenuRowId}
              />
            ))}

            {state === 'empty' && (
              <tr>
                <td colSpan={7} className="users-table__empty-state">
                  <div className="empty-state-content">
                    <svg className="empty-state-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A2.25 2.25 0 0 1 12.75 21.5h-1.5a2.25 2.25 0 0 1-2.25-2.263V19.13m-4.786-1.574A9.32 9.32 0 0 0 2.25 18a9.337 9.337 0 0 0 4.121.952m0 0a8.979 8.979 0 0 0 2.625-.372m0 0V19.13m0 0v-.003c0-1.113.285-2.16.786-3.07M15 7.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                    <h3 className="empty-state-title">No Users Found</h3>
                    <p className="empty-state-text">There are currently no users in the database to display. Try clearing filters or creating a new user.</p>
                  </div>
                </td>
              </tr>
            )}

            {state === 'error' && (
              <tr>
                <td colSpan={7} className="users-table__error-state">
                  <div className="error-state-content">
                    <svg className="error-state-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#E13535" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <h3 className="error-state-title">Failed to Load Users</h3>
                    <p className="error-state-text">An error occurred while fetching the users list from the server. Please check your internet connection and try again.</p>
                    <button type="button" className="error-state-btn" onClick={() => onRetry?.()}>
                      Try Again
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
