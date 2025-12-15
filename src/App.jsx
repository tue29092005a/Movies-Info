import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Layout, { Dashboard_movie } from "./layout/Layout";
import {
  GET_movies,
  GET_topRatedMovies,
  GET_movieDetail,
  GET_mostPopularMovies,
  GET_movieReviews,
} from "@/api/movies";
import { useState } from "react";
import { Display_MovieDetail } from "./movies_display/MovieDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Display_CharacterDetail } from "./character/DetailCharacter";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard_movie />} />
          <Route path="/movies/:id" element ={<Display_MovieDetail/>}/>
          <Route path="/persons/:id" element={<Display_CharacterDetail/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
