import React, { useState } from 'react';
import avatarImg from '@/assets/images/avatar.png';
import logoImg from '@/assets/images/logo.png';
import './Navbar.scss';

// Custom icons
const LendsqrLogo: React.FC = () => (
  <div className="navbar__logo">
    <img src={logoImg} alt="Lendsqr" className="navbar__logo-img" />
  </div>
);

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const BellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const Navbar: React.FC = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="navbar">
      <div className="navbar__container">
        
        {/* Left Section: Logo */}
        <div className="navbar__left">
          <LendsqrLogo />
        </div>

        {/* Middle Section: Search Bar */}
        <form className="navbar__search" onSubmit={handleSearchSubmit}>
          <div className="navbar__search-group">
            <input
              type="text"
              className="navbar__search-input"
              placeholder="Search for anything"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="navbar__search-btn" aria-label="Submit search">
              <SearchIcon className="navbar__search-icon" />
            </button>
          </div>
        </form>

        {/* Right Section: Navigation actions, notification, and profile */}
        <div className="navbar__right">
          
          <a href="#docs" className="navbar__docs">
            Docs
          </a>

          <button className="navbar__notification" aria-label="Notifications">
            <BellIcon className="navbar__notification-icon" />
          </button>

          {/* User Profile Info & Dropdown Trigger */}
          <div className="navbar__profile-wrapper">
            <button 
              className="navbar__profile-trigger" 
              onClick={toggleProfileDropdown}
              aria-expanded={isProfileDropdownOpen}
            >
              <img src={avatarImg} alt="User Profile Avatar" className="navbar__avatar" />
              <span className="navbar__username">Adedeji</span>
              <ChevronDownIcon className={`navbar__chevron ${isProfileDropdownOpen ? 'navbar__chevron--rotated' : ''}`} />
            </button>

            {isProfileDropdownOpen && (
              <div className="navbar__dropdown">
                <ul className="navbar__dropdown-list">
                  <li className="navbar__dropdown-item">
                    <a href="#profile" className="navbar__dropdown-link" onClick={() => setIsProfileDropdownOpen(false)}>My Profile</a>
                  </li>
                  <li className="navbar__dropdown-item">
                    <a href="#settings" className="navbar__dropdown-link" onClick={() => setIsProfileDropdownOpen(false)}>Settings</a>
                  </li>
                  <li className="navbar__dropdown-divider"></li>
                  <li className="navbar__dropdown-item">
                    <a href="#logout" className="navbar__dropdown-link navbar__dropdown-link--logout" onClick={() => setIsProfileDropdownOpen(false)}>Logout</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          
        </div>

      </div>
    </header>
  );
};

export default Navbar;