import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; // Để biết khi nào User Login
import { GET_userFavorites, POST_addToFavorites, DELETE_removeFromFavorites } from "@/api/user/profile";


const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  

  const [favoriteIds, setFavoriteIds] = useState(() => {
    const local = localStorage.getItem("favorites_local");
    return local ? JSON.parse(local) : [];
  });

  useEffect(() => {
    if (isAuthenticated) {
      const syncFavorites = async () => {
        const serverList = await GET_userFavorites();

        const serverIds = serverList.map(movie => movie.id);

        setFavoriteIds(serverIds);
        localStorage.setItem("favorites_local", JSON.stringify(serverIds));
      };
      syncFavorites();
    }
  }, [isAuthenticated]);


  const toggleFavorite = async (movie) => {
    const isExisted = favoriteIds.includes(movie.id);
    let newIds = [];

    if (isExisted) {
      newIds = favoriteIds.filter(id => id !== movie.id);
      alert(  `Đã xóa "${movie.title}" khỏi yêu thích` );
    } else {
      newIds = [...favoriteIds, movie.id];
      alert( `Đã thêm "${movie.title}" vào yêu thích` );
    }

    setFavoriteIds(newIds);
    localStorage.setItem("favorites_local", JSON.stringify(newIds));

    if (isAuthenticated) {
      try {
        if (isExisted) {
          await DELETE_removeFromFavorites(movie.id);
        } else {
          await POST_addToFavorites(movie.id);
        }
      } catch (error) {
        console.error("Sync error, rolling back");
        setFavoriteIds(favoriteIds); // Trả về state cũ
        alert( "Không thể lưu vào server" );
      }
    } else {
         alert( "Bạn đang lưu ở máy cá nhân. Đăng nhập để đồng bộ" );
    }
  };


  const checkIsFavorite = (id) => favoriteIds.includes(id);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, checkIsFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);