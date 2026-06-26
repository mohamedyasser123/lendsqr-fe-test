import React, { useState } from 'react';
import logoImg from '@/assets/images/logo.png';
import './LoginForm.scss';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../../hooks/useLogin";
import { loginSchema, type LoginSchema } from "../../validation/login.schema";

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-form">
      {/* Mobile-only logo */}
      <div className="login-form__logo-container">
        <img src={logoImg} alt="Lendsqr Logo" className="login-form__mobile-logo" />
      </div>

      <div className="login-form__header">
        <h1 className="login-form__title">Welcome!</h1>
        <p className="login-form__subtitle">Enter details to login.</p>
      </div>

      <form className="login-form__body" onSubmit={handleSubmit(login)}>
        <div className="login-form__input-group">
          <label htmlFor="email" className="login-form__label">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="login-form__input"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <span id="email-error" className="login-form__error" role="alert">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="login-form__input-group login-form__input-group--password">
          <label htmlFor="password" className="login-form__label">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="login-form__input"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password")}
          />
          {errors.password && (
            <span id="password-error" className="login-form__error" role="alert">
              {errors.password.message}
            </span>
          )}
          <button
            type="button"
            className="login-form__password-toggle"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
          >
            {showPassword ? 'HIDE' : 'SHOW'}
          </button>
        </div>

        <div className="login-form__actions">
          <a href="#forgot-password" className="login-form__forgot-link">
            FORGOT PASSWORD?
          </a>
        </div>

        <button
          type="submit"
          className="login-form__submit-btn"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? "LOGGING IN..." : "LOG IN"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
