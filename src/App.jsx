import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Layout from "./layout/Layout";
import { GET_movies,GET_topRatedMovies,GET_movieDetail,GET_mostPopularMovies,GET_movieReviews } from "@/api/movies";
import { useState } from "react";

import { BrowserRouter,Routes, Route } from "react-router-dom";

export default function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  )
}


