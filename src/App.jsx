import React, { useEffect } from "react";
import Layout, { Dashboard_movie } from "./layout/Layout";
import { Display_MovieDetail } from "./movies_display/MovieDetail";
import { Routes, Route } from "react-router-dom";
import { Display_CharacterDetail } from "./character/DetailCharacter";
import { useTheme } from "./context/ThemeContext";
import RegisterPage from "./auth/Register";
import LoginPage from "./auth/Login";
import UserProfile from "./user/UserProfile";
import UserFavorites from "./user/UserFavorites";
import { ProtectedRoute } from "./auth/ProtectedAuth";
export default function App() {
  const { isDark } = useTheme();
  return (
    <div
      className={` ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } `}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard_movie />} />
          <Route path="/movies/:id" element={<Display_MovieDetail />} />
          <Route path="/persons/:id" element={<Display_CharacterDetail />} />
          <Route path="/user">
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="profile" element={<UserProfile />} />
              <Route path="favorites" element={<UserFavorites />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
