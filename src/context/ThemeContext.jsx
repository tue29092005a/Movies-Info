import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // 1. Khởi tạo state: Lấy từ localStorage hoặc mặc định là 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // 2. useEffect: Mỗi khi 'theme' thay đổi thì cập nhật DOM và LocalStorage
  useEffect(() => {
    const root = window.document.documentElement; // Lấy thẻ <html>

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Lưu lựa chọn để lần sau user vào vẫn nhớ
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Hàm toggle đơn giản
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook custom để dùng cho gọn
export const useTheme = () => useContext(ThemeContext);