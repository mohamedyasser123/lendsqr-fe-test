import React from 'react';
import logoImg from '@/assets/images/logo.png';
import bannerImg from '@/assets/svg/pablo-sign-in 1.svg';
import './LoginBanner.scss';

export const LoginBanner: React.FC = () => {
  return (
    <div className="login-banner">
      <div className="login-banner__logo-container">
        <img src={logoImg} alt="Lendsqr Logo" className="login-banner__logo" />
      </div>
      <div className="login-banner__illustration-container">
        <img src={bannerImg} alt="Sign In Illustration" className="login-banner__illustration" />
      </div>
    </div>
  );
};

export default LoginBanner;
