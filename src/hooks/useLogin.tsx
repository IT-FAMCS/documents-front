import { useState, useEffect } from "react";
import { LOGIN_URL, CHECK_TOKEN_URL } from "../constants/apiUrls";
import { fetchPost } from "../api/FetchPost";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage("token", "");

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

      if (response && response.token) {
        setToken(response.token);
        setIsAuthenticated(true);
        console.log("Token saved successfully:", response.token);
      } else {
        console.error("Token not found in response:", response);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    setToken("");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const checkToken = async () => {
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
