import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { type LoginFormData } from "../types/auth.types";

export const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (_data: LoginFormData) => {
    try {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      localStorage.setItem("isAuthenticated", "true");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
  };
};