// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { POST_login, POST_register } from "@/api/user/user";
import { useNavigate } from "react-router-dom"; // Nếu dùng Router

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  // Kiểm tra đăng nhập khi F5 trang
  useEffect(() => {
    const token = localStorage.getItem("user_access_token");
    const storedUser = localStorage.getItem("user_info");
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Hàm Login
  const login = async (username, password) => {
    try {
      const data = await POST_login(username, password);
      
      if (data && data.token) {
        localStorage.setItem("user_access_token", data.token);
        localStorage.setItem("user_info", JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true, message: data.message };
      }
      return { 
        success: false, 
        message: data?.message || "Đăng nhập thất bại, tài khoản không tồn tại" 
      };
    } catch (error) {
        alert(error.message)
      return { success: false, message: error.message };
    }
  };

  const register = async (formData) => {
    const data = await POST_register(formData);
    if (data && data.user) {
      navigate("/user/login");
      return { success: true, message: data.message };
    }
    return { success: false, message: "Đăng ký thất bại" };
  };


  const logout = () => {
    localStorage.removeItem("user_access_token");
    localStorage.removeItem("user_info");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/user/login"); 
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);