import React, { useEffect, useState } from "react";
import { GET_searchMovies } from "@/api/movies"; // Hàm gọi API search của bạn
import { MovieCard } from "@/movies_display/MovieCard";
import { useSearchParams } from "react-router-dom";
import { App_Pagination } from "@/pagination/Pagination";
export default function Search_movieGrid({ query, page, limit }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  // state pagination de truyen vo ham
  const [paginationInfo, setPaginationInfo] = useState({
    total_items: 0,
    current_page: 1,
    total_pages: 0,
    page_size: 10,
  });

  const handlePageChange = (newPage) => {
    const newUrl = new URLSearchParams(searchParams);
    newUrl.set("page", newPage);
    setSearchParams(newUrl);
  };

  useEffect(() => {
    const fetchSearch = async () => {
      setLoading(true);
      try {
        const data = await GET_searchMovies(query, page, limit);

        const results = Array.isArray(data.data) ? data.data : [];
        const pagi_info = data.pagination;
        setMovies(results);
        setPaginationInfo({
          total_items: pagi_info.total_items || 0,
          current_page: pagi_info.current_page || page,
          total_pages: pagi_info.total_pages|| 0,
          page_size: pagi_info.page_size||limit,
        });
      } catch (error) {
        console.error("Lỗi tìm kiếm:", error);
      } finally {
        setLoading(false);
        console.log();
      }
    };

    if (query) {
      fetchSearch();
    }
  }, [query,page, limit]); 

  if (loading) {
    return <div className="text-center py-10">Đang tìm kiếm phim...</div>;
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Không tìm thấy phim nào khớp với từ khóa này.
      </div>
    );
  }

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <div key={movie.id} className="h-full">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
    <div className="py-8">
        <App_Pagination 
            pagination={paginationInfo} 
            onPageChange={handlePageChange} 
        />
      </div>
    </>
  );
}
