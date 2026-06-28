import React from 'react';

const UserDetailsHeader: React.FC = () => {
  return (
    <div className="user-details-header">
      <h1 className="user-details-header__title">User Details</h1>
      <div className="user-details-header__actions">
        <button type="button" className="user-details-header__btn user-details-header__btn--blacklist">
          Blacklist User
        </button>
        <button type="button" className="user-details-header__btn user-details-header__btn--activate">
          Activate User
        </button>
      </div>
    </div>
  );
};

export default UserDetailsHeader;
