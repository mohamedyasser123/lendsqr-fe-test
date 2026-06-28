import React from 'react';

export type TabId =
  | 'general'
  | 'documents'
  | 'bank-details'
  | 'loans'
  | 'savings'
  | 'app-system';

interface Tab {
  id: TabId;
  label: string;
}

const TABS: Tab[] = [
  { id: 'general', label: 'General Details' },
  { id: 'documents', label: 'Documents' },
  { id: 'bank-details', label: 'Bank Details' },
  { id: 'loans', label: 'Loans' },
  { id: 'savings', label: 'Savings' },
  { id: 'app-system', label: 'App and System' },
];

interface UserDetailsTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const UserDetailsTabs: React.FC<UserDetailsTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="user-details-tabs" role="tablist" aria-label="User detail sections">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`tabpanel-${tab.id}`}
          id={`tab-${tab.id}`}
          className={`user-details-tabs__tab ${activeTab === tab.id ? 'user-details-tabs__tab--active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default UserDetailsTabs;
