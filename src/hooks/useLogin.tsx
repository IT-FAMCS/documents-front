import { useState, useEffect } from "react";
import { LOGIN_URL, CHECK_TOKEN_URL } from "../constants/apiUrls";
import { fetchPost } from "../api/FetchPost";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const result = await checkToken();
      setIsAuthenticated(result);
    };

    verifyToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetchPost(LOGIN_URL, {
        email,
        password,
      });
      if (response.token) {
        localStorage.setItem("token", response.token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const checkToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }

    try {
      await fetchPost(CHECK_TOKEN_URL, { token });
      return true;
    } catch (error) {
      console.error("Token check failed:", error);
      return false;
    }
  };

  return { login, logout, checkToken, isAuthenticated };
};
