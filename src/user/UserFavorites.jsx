import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, HeartOff, Loader2 } from "lucide-react";

import { GET_userFavorites } from "@/api/user/profile";
import { useFavorites } from "@/context/FavoritesContext";
import { MovieCard } from "@/movies_display/MovieCard"; // Component bạn đã có
import { Button } from "@/components/ui/button";

export default function UserFavorites() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const { toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const data = await GET_userFavorites();

        if (Array.isArray(data)) {
          setMovies(data);
        } else if (data?.favorites) {
          setMovies(data.favorites);
        }
      } catch (error) {
        console.error("Lỗi tải danh sách yêu thích", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemove = async (e, movie) => {
    e.preventDefault();
    e.stopPropagation();

    await toggleFavorite(movie);

    setMovies((prevMovies) => prevMovies.filter((m) => m.id !== movie.id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          Phim Yêu Thích Của Tôi
          <span className="text-lg font-normal text-muted-foreground bg-muted px-3 py-1 rounded-full">
            {movies.length}
          </span>
        </h1>
      </div>

      {movies.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed">
          <HeartOff className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Danh sách yêu thích đang trống
          </h3>
          <p className="text-muted-foreground mt-2 mb-6">
            Hãy dạo một vòng và thả tim cho những bộ phim bạn thích nhé!
          </p>
          <Link to="/">
            <Button>Khám phá phim ngay</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="relative group">
              <MovieCard movie={movie} />

              <div className="absolute top-2 right-2 z-10 transition-opacity duration-300">
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-9 w-9 rounded-full shadow-lg border-2 border-white dark:border-gray-900"
                  onClick={(e) => handleRemove(e, movie)}
                  title="Xóa khỏi yêu thích"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
