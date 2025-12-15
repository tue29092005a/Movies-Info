import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Star } from "lucide-react"; 
import { Badge } from "@/components/ui/badge"; // Nếu bạn đã cài badge, hoặc dùng thẻ span thường

export function MovieCard({ movie }) {
  // Destructuring để code gọn hơn
  const { id, title, image, short_description, rate, genres } = movie;

  return (
    <Link to={`/movie/${id}`} className="block h-full w-full">
      {/* Container chính: group để bắt sự kiện hover */}
      <Card className="group relative h-full w-full overflow-hidden border-0 bg-black/5 shadow-md rounded-lg">
        <CardContent className="p-0 h-full">
          
          {/* 1. ẢNH POSTER (movie.image) */}
          <div className="relative aspect-[2/3] w-full overflow-hidden">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />

            {/* Rating Badge (Luôn hiện ở góc trên) */}
            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400" />
              {rate?.toFixed(1) || "N/A"}
            </div>

            {/* 2. OVERLAY THÔNG TIN (Trượt từ dưới lên khi Hover) */}
            <div className="absolute bottom-0 left-0 w-full translate-y-full bg-gradient-to-t from-black via-black/80 to-transparent p-4 text-white opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
              
              <div className="flex flex-col space-y-2">
                {/* Title */}
                <h3 className="line-clamp-2 text-lg font-bold leading-tight">
                  {title}
                </h3>

                {/* Genres: Hiển thị tối đa 3 thể loại đầu tiên để không bị vỡ layout */}
                <div className="flex flex-wrap gap-1">
                  {Array.isArray(genres) && genres.slice(0, 3).map((genre, index) => (
                    <span 
                      key={index} 
                      className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-gray-200"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Short Description */}
                <p className="line-clamp-3 text-xs text-gray-300">
                  {short_description || "Chưa có mô tả cho phim này."}
                </p>

                {/* Nút Xem Ngay */}
                <Button size="sm" className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90 h-8 text-xs">
                  <Play className="mr-1 h-3 w-3 fill-current" /> Xem Ngay
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}