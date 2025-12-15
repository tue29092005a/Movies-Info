import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Layout from "./layout/Layout";
import { GET_movies } from "@/api/api_call";
import { useState } from "react";
export default function App() {
  const [data, setData] = useState();
  useEffect(() => {
    // 2. Tạo một hàm async riêng bên trong useEffect
    const fetchData = async () => {
      try {
        const result = await GET_movies(1, 10);
        // Kiểm tra xem result có dữ liệu không trước khi set
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Lỗi khi fetch:", error);
      }
    };

    fetchData();
  }, []); // 3. QUAN TRỌNG: Thêm [] để chỉ chạy 1 lần khi component mount

  // 4. Muốn log data thì dùng useEffect riêng theo dõi state 'data'
  useEffect(() => {
    console.log("Dữ liệu đã cập nhật:", data);
  }, [data]);

  return <></>;
}
