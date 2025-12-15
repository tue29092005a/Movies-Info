import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Layout from "./layout/Layout";
import { GET_movies,GET_topRatedMovies,GET_movieDetail,GET_mostPopularMovies,GET_movieReviews } from "@/api/api_call";
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


/**
 * Lấy danh sách Persons có phân trang
 * @param {number} page - Trang hiện tại (mặc định 1)
 * @param {number} limit - Số lượng item mỗi trang (mặc định 10)
 */
export async function GET_persons(page = 1, limit = 10) {
  try {
    const res = await fetch(
      `${API_URL}/persons?page=${page}&limit=${limit}`,
      {
        headers: {
          accept: "application/json",
          "x-app-token": TOKEN_AUTH,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}


/**
 * Lấy thông tin chi tiết của một Person theo ID
 * @param {string} personId - ID của person (VD: 'nm0000122')
 */
export async function GET_personDetail(personId) {
  try {
    const res = await fetch(
      `${API_URL}/persons/${personId}`,
      {
        headers: {
          accept: "application/json",
          "x-app-token": TOKEN_AUTH,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}