import React from 'react';
import { 
  CardUsersIcon, 
  CardActiveUsersIcon, 
  CardLoansIcon, 
  CardSavingsIcon 
} from './icons';
import './UsersStats.scss';

export interface StatCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  count: string | number;
  isActive?: boolean;
  colorClass: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  icon: Icon, 
  label, 
  count, 
  isActive = false, 
  colorClass 
}) => {
  return (
    <div className={`users-stat-card ${isActive ? 'users-stat-card--active' : ''}`}>
      <div className={`users-stat-card__icon-wrapper users-stat-card__icon-wrapper--${colorClass}`}>
        <Icon className="users-stat-card__icon" />
      </div>
      <span className="users-stat-card__label">{label}</span>
      <span className="users-stat-card__count">{count}</span>
    </div>
  );
};

export const UsersStats: React.FC = () => {
  const statsData = [
    {
      icon: CardUsersIcon,
      label: 'Users',
      count: '2,453',
      isActive: true, // As shown in Figma (card highlighted with blue border)
      colorClass: 'pink',
    },
    {
      icon: CardActiveUsersIcon,
      label: 'Active Users',
      count: '2,453',
      isActive: false,
      colorClass: 'purple',
    },
    {
      icon: CardLoansIcon,
      label: 'Users with Loans',
      count: '12,453',
      isActive: false,
      colorClass: 'orange',
    },
    {
      icon: CardSavingsIcon,
      label: 'Users with Savings',
      count: '102,453',
      isActive: false,
      colorClass: 'red',
    },
  ];

  return (
    <div className="users-stats-container">
      {statsData.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default UsersStats;
