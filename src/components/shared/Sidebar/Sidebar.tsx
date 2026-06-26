import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';
import {
  ChevronDownIcon,
  BriefcaseIcon,
  HomeIcon,
  UsersIcon,
  GuarantorsIcon,
  LoansIcon,
  DecisionModelsIcon,
  SavingsIcon,
  LoanRequestsIcon,
  WhitelistIcon,
  KarmaIcon,
  SavingsProductsIcon,
  FeesChargesIcon,
  TransactionsIcon,
  ServicesIcon,
  ServiceAccountIcon,
  SettlementsIcon,
  ReportsIcon,
  PreferencesIcon,
  FeesPricingIcon,
  AuditLogsIcon
} from './icons';

// Interface definitions
interface SidebarItemProps {
  label: string;
  path: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

// Sub-component for individual menu items
const SidebarItem: React.FC<SidebarItemProps> = ({ label, path, icon: Icon, onClick }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `sidebar__item${isActive ? ' sidebar__item--active' : ''}`
      }
      onClick={onClick}
    >
      <div className="sidebar__item-icon-container">
        <Icon className="sidebar__item-icon" />
      </div>
      <span className="sidebar__item-text">{label}</span>
    </NavLink>
  );
};

// Sub-component for grouping sections
const SidebarSection: React.FC<SidebarSectionProps> = ({ title, children }) => {
  return (
    <div className="sidebar__section">
      <h3 className="sidebar__section-title">{title}</h3>
      <div className="sidebar__section-content">{children}</div>
    </div>
  );
};

// Sample organizations list for Switch Organization dropdown
const ORGANIZATIONS = [
  'Lendsqr',
  'Irembo',
  'Safaricom',
  'Kuda Bank',
  'Flutterwave'
];

export const Sidebar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState('Switch Organization');

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  const toggleOrgDropdown = () => {
    setIsOrgDropdownOpen(!isOrgDropdownOpen);
  };

  const handleSelectOrg = (org: string) => {
    setSelectedOrg(org);
    setIsOrgDropdownOpen(false);
  };

  // Sidebar Menu Data Configuration
  const customerItems = [
    { label: 'Users', path: '/users', icon: UsersIcon },
    { label: 'Guarantors', path: '/guarantors', icon: GuarantorsIcon },
    { label: 'Loans', path: '/loans', icon: LoansIcon },
    { label: 'Decision Models', path: '/decision-models', icon: DecisionModelsIcon },
    { label: 'Savings', path: '/savings', icon: SavingsIcon },
    { label: 'Loan Requests', path: '/loan-requests', icon: LoanRequestsIcon },
    { label: 'Whitelist', path: '/whitelist', icon: WhitelistIcon },
    { label: 'Karma', path: '/karma', icon: KarmaIcon },
  ];

  const businessItems = [
    { label: 'Organization', path: '/organization', icon: BriefcaseIcon },
    { label: 'Loan Products', path: '/loan-products', icon: LoansIcon },
    { label: 'Savings Products', path: '/savings-products', icon: SavingsProductsIcon },
    { label: 'Fees and Charges', path: '/fees-charges', icon: FeesChargesIcon },
    { label: 'Transactions', path: '/transactions', icon: TransactionsIcon },
    { label: 'Services', path: '/services', icon: ServicesIcon },
    { label: 'Service Account', path: '/service-account', icon: ServiceAccountIcon },
    { label: 'Settlements', path: '/settlements', icon: SettlementsIcon },
    { label: 'Reports', path: '/reports', icon: ReportsIcon },
  ];

  const settingsItems = [
    { label: 'Preferences', path: '/preferences', icon: PreferencesIcon },
    { label: 'Fees and Pricing', path: '/fees-pricing', icon: FeesPricingIcon },
    { label: 'Audit Logs', path: '/audit-logs', icon: AuditLogsIcon },
  ];

  return (
    <>
      {/* Mobile Toggle Hamburger Button */}
      <button
        className={`sidebar__toggle-btn ${isMobileOpen ? 'sidebar__toggle-btn--open' : ''}`}
        onClick={toggleMobileSidebar}
        aria-label="Toggle sidebar menu"
      >
        <span className="sidebar__toggle-btn-bar"></span>
        <span className="sidebar__toggle-btn-bar"></span>
        <span className="sidebar__toggle-btn-bar"></span>
      </button>

      {/* Backdrop overlay for mobile screen sizes */}
      {isMobileOpen && (
        <div className="sidebar__backdrop" onClick={closeMobileSidebar} />
      )}

      {/* Sidebar Navigation Panel */}
      <aside className={`sidebar ${isMobileOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__container">
          
          {/* Organization Switcher Dropdown */}
          <div className="sidebar__org-switcher">
            <button 
              className={`sidebar__org-header ${isOrgDropdownOpen ? 'sidebar__org-header--open' : ''}`}
              onClick={toggleOrgDropdown}
            >
              <BriefcaseIcon className="sidebar__org-icon" />
              <span className="sidebar__org-name">{selectedOrg}</span>
              <ChevronDownIcon className={`sidebar__org-chevron ${isOrgDropdownOpen ? 'sidebar__org-chevron--rotated' : ''}`} />
            </button>

            {isOrgDropdownOpen && (
              <ul className="sidebar__org-dropdown">
                {ORGANIZATIONS.map((org) => (
                  <li key={org} className="sidebar__org-dropdown-item">
                    <button 
                      onClick={() => handleSelectOrg(org)}
                      className="sidebar__org-dropdown-btn"
                    >
                      <BriefcaseIcon className="sidebar__org-dropdown-item-icon" />
                      {org}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="sidebar__nav">
            {/* Dashboard Link (Stand-alone item at the top) */}
            <div className="sidebar__dashboard-wrapper">
              <SidebarItem 
                label="Dashboard" 
                path="/dashboard" 
                icon={HomeIcon} 
                onClick={closeMobileSidebar} 
              />
            </div>

            {/* Customers Section */}
            <SidebarSection title="CUSTOMERS">
              {customerItems.map((item) => (
                <SidebarItem
                  key={item.label}
                  label={item.label}
                  path={item.path}
                  icon={item.icon}
                  onClick={closeMobileSidebar}
                />
              ))}
            </SidebarSection>

            {/* Businesses Section */}
            <SidebarSection title="BUSINESSES">
              {businessItems.map((item) => (
                <SidebarItem
                  key={item.label}
                  label={item.label}
                  path={item.path}
                  icon={item.icon}
                  onClick={closeMobileSidebar}
                />
              ))}
            </SidebarSection>

            {/* Settings Section */}
            <SidebarSection title="SETTINGS">
              {settingsItems.map((item) => (
                <SidebarItem
                  key={item.label}
                  label={item.label}
                  path={item.path}
                  icon={item.icon}
                  onClick={closeMobileSidebar}
                />
              ))}
            </SidebarSection>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;