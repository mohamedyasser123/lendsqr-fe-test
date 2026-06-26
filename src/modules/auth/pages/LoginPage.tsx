import React from 'react';
import LoginBanner from '../components/LoginBanner/LoginBanner';
import LoginForm from '../components/LoginForm/LoginForm';
import './LoginPage.scss';

export const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <div className="login-page__banner-section">
        <LoginBanner />
      </div>
      <div className="login-page__form-section">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;