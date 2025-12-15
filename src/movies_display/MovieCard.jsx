import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react"; // Import icon nếu cần

export function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="block h-full">
      {/* 1. Thêm class 'group' vào Card cha để điều khiển hover */}
      <Card className="group relative h-full overflow-hidden border-0 bg-black/5 shadow-md">
        
        <CardContent className="p-0 h-full">
          {/* ẢNH POSTER */}
          <div className="relative aspect-[2/3] overflow-hidden rounded-md">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              // ^ Thêm hiệu ứng zoom nhẹ ảnh khi hover để nhìn chuyên nghiệp hơn
              loading="lazy"
            />

            {/* OVERLAY THÔNG TIN (Sẽ trượt lên khi hover) */}
            <div className="absolute bottom-0 left-0 w-full translate-y-full bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
              
              {/* Nội dung thông tin */}
              <div className="flex flex-col space-y-2">
                <h3 className="line-clamp-1 text-lg font-bold text-white">
                  {movie.title}
                </h3>
                
                <div className="flex items-center justify-between text-xs text-gray-300">
                  <span>{movie.releaseDate?.split("-")[0] || "N/A"}</span>
                  <span className="flex items-center gap-1 text-yellow-400">
                    ★ {movie.rating?.toFixed(1)}
                  </span>
                </div>

                <p className="line-clamp-2 text-xs text-gray-200">
                  {movie.overview || "Mô tả phim đang được cập nhật..."}
                </p>

                {/* Các nút hành động nhanh (Optional) */}
                <div className="mt-2 flex gap-2 pt-2">
                   <Button size="sm" className="w-full h-8 bg-white text-black hover:bg-gray-200">
                      <Play className="mr-1 h-3 w-3" /> Xem
                   </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}