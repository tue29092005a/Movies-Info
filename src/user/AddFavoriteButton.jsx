import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/context/FavoritesContext";
import { cn } from "@/lib/utils"; 

export function AddToFavoriteBtn({ movie, className }) {
  const { checkIsFavorite, toggleFavorite } = useFavorites();
  
  if (!movie) return null;

  const isFav = checkIsFavorite(movie.id);

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("rounded-full transition-all duration-300", className)}
      onClick={(e) => {
        e.preventDefault(); 
        e.stopPropagation();
        toggleFavorite(movie);
      }}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-colors",
          isFav ? "fill-red-500 text-red-500" : "text-gray-500 hover:text-red-500"
        )}
      />
    </Button>
  );
}