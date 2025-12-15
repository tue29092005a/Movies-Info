import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MovieCard } from "@/movies_display/MovieCard";
import {
  GET_movies,
  GET_topRatedMovies,
  GET_movieDetail,
  GET_mostPopularMovies,
  GET_movieReviews,
} from "@/api/movies";
import { useState,useEffect } from "react";
export function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export function Carousel_topMovie({ list_movies }) {
  if (!list_movies || list_movies.length === 0) return null;
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {list_movies.map((movie, index) => (
          <CarouselItem key={index}>
            <MovieCard movie={movie} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export function Display_topMovie() {
  const [topMovies, setTopMovies] = useState([]);
  useEffect(() => {
    async function getMovie() {
      const dataMovie = await GET_mostPopularMovies(1, 30);
      const newTopMovies = dataMovie.data;
      if (newTopMovies) {
        setTopMovies([...newTopMovies]);
      }
    }
    getMovie();
  }, []);
  return (
    <div className ="flex justify-center">
      <Carousel_topMovie list_movies={topMovies} />
    </div>
  );
}


export function Carousel_popularMovie({ list_movies }) {
  if (!list_movies || list_movies.length === 0) return null;
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {list_movies.map((movie, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <MovieCard movie={movie} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export function Display_popularMovie() {
  const [topMovies, setTopMovies] = useState([]);
  useEffect(() => {
    async function getMovie() {
      const dataMovie = await GET_mostPopularMovies(1, 30);
      const newTopMovies = dataMovie.data;
      if (newTopMovies) {
        setTopMovies([...newTopMovies]);
      }
    }
    getMovie();
  }, []);
  return (
    <div className ="flex justify-center">
      <Carousel_popularMovie list_movies={topMovies} />
    </div>
  );
}