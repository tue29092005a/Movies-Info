import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Layout from "./layout/Layout";
import { GET_movies,GET_topRatedMovies,GET_movieDetail,GET_mostPopularMovies,GET_movieReviews } from "@/api/movies";
import { useState } from "react";
export default function App() {

  const [topMovies, setMovies] = useState();
  const [detail, setCurrentMovie] = useState();

useEffect(() => {
  const fetchData = async () => {
    // Gọi API Top Rated
    const topRated = await GET_movieReviews('tt4154796', 1, 10);
    
    // Gọi API chi tiết phim
    const detail = await GET_movieDetail('tt0111161'); // ID ví dụ

    if (topRated) setMovies(topRated);
    if (detail) setCurrentMovie(detail);
  };

  fetchData();
}, []);

  // 4. Muốn log data thì dùng useEffect riêng theo dõi state 'data'
  useEffect(() => {
    console.log("Dữ liệu đã cập nhật:", topMovies, detail);
  }, [topMovies, detail]);

  return <></>;
}


