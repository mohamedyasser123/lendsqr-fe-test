import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '../icons';

const UserDetailsBreadcrumb: React.FC = () => {
  return (
    <nav className="user-details-breadcrumb" aria-label="Breadcrumb">
      <Link to="/users" className="user-details-breadcrumb__link">
        Users
      </Link>
      <ChevronRightIcon className="user-details-breadcrumb__separator" />
      <span className="user-details-breadcrumb__current">User Details</span>
    </nav>
  );
};

export default UserDetailsBreadcrumb;
