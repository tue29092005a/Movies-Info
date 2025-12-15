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
import { useState, useEffect } from "react";


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
      const promisePage1 = GET_mostPopularMovies(1, 12);
      const promisePage2 = GET_mostPopularMovies(2, 12);
      const [data1, data2] = await Promise.all([promisePage1, promisePage2]);
      const list1 = Array.isArray(data1.data) ? data1.data : [];
      const list2 = Array.isArray(data2.data) ? data2.data : [];
      const topMovies = [...list1, ...list2];
      if(topMovies){
        setTopMovies(topMovies)
      }
    }
    getMovie();
  }, []);
  return (
    <div className="flex justify-center">
      <Carousel_topMovie list_movies={topMovies} />
    </div>
  );
}

export function Carousel_3_Movies({ list_movies }) {
  if (!list_movies || list_movies.length === 0) return null;
  return (
    <Carousel className="w-[80%] max-w ">
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
      const promisePage1 = GET_mostPopularMovies(1, 12);
      const promisePage2 = GET_mostPopularMovies(2, 12);
      const [data1, data2] = await Promise.all([promisePage1, promisePage2]);
      const list1 = Array.isArray(data1.data) ? data1.data : [];
      const list2 = Array.isArray(data2.data) ? data2.data : [];
      const topMovies = [...list1, ...list2];
      if(topMovies){
        setTopMovies(topMovies)
      }
    }
    getMovie();
  }, []);
  return (
    <div className="flex justify-center">
      <Carousel_3_Movies list_movies={topMovies} />
    </div>
  );
}


export function Display_topRating() {
  const [topMovies, setTopMovies] = useState([]);
  useEffect(() => {
    async function getMovie() {
      const promisePage1 = GET_topRatedMovies('IMDB_TOP_50',1, 12);
      const promisePage2 = GET_topRatedMovies('IMDB_TOP_50',2, 12);
      const [data1, data2] = await Promise.all([promisePage1, promisePage2]);
      const list1 = Array.isArray(data1.data) ? data1.data : [];
      const list2 = Array.isArray(data2.data) ? data2.data : [];
      const topMovies = [...list1, ...list2];
      if(topMovies){
        setTopMovies(topMovies)
      }
    }
    getMovie();
  }, []);
  return (
    <div className="flex justify-center">
      <Carousel_3_Movies list_movies={topMovies} />
    </div>
  );
}