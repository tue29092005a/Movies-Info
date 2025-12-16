import { useTheme } from "../context/ThemeContext"; // Import hook
import { House, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SearchForm } from "./SearchForm";
import { Link, useSearchParams } from "react-router-dom";
import {
  Display_topMovie,
  Display_popularMovie,
  Display_topRating,
  Carousel_topMovie,
  Carousel_3_Movies,
} from "@/layout/Carousel_movie";
import { Outlet } from "react-router-dom";
import Search_movieGrid from "@/movies_display/MovieGrid";
import { UserAvatar } from "@/user/UserAvatar";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { GET_mostPopularMovies, GET_topRatedMovies } from "@/api/movies";
import { useState,useEffect } from "react";
export default function Layout() {
  return (
    <>
      <Header />
      <Nav_bar />
      <Outlet />
      <Footer />
    </>
  );
}
export function Header() {
  const { toggleTheme } = useTheme();
  return (
    <div className={`flex flex-row justify-around p-1 `}>
      <p>23120398</p>
      <h1>Movies Info</h1>
      <div className="flex flex-row justify-around">
        <Switch id="dark_mode" onClick={toggleTheme} />
        <Label htmlFor="dark_mode">Change dark mode</Label>
      </div>
      <div>
        <UserAvatar />
      </div>
    </div>
  );
}
export function Nav_bar() {
  return (
    <div className={`flex flex-row justify-between p-1 `}>
      <Link to="/">
        <House />
      </Link>
      <SearchForm />
    </div>
  );
}
export function Footer() {
  return (
    <div className="flex flex-row justify-center m-1">
      <p>23120398</p>
    </div>
  );
}


export function NoQuery_Dashboard() {
  return (
    <>
      <div className="p-5">
        <Display_topMovie />
      </div>

      <div className="p-5">
        <h2 className="pl-20 pb-5 font-bold text-3xl">Most popular</h2>
        <Display_popularMovie />
      </div>
      <div className="p-5">
        <h2 className="pl-20 pb-5 font-bold text-3xl">Top rating</h2>
        <Display_topRating />
      </div>
    </>
  );
}

export function Dashboard_movie() {
  // dung cho Search_movieGrid
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 12;
  // du lieu full trang Dash_board
  const [allData, setAllData] = useState({
    popular: [],
    topRated: [],
    trending: [],
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchAllMoviesData() {
      setLoading(true);
      try {
        const [popData, popData_2, trendData_1, trendData_2] =
          await Promise.all([
            GET_mostPopularMovies(1, 12),
            GET_mostPopularMovies(2, 12),
            GET_topRatedMovies("IMDB_TOP_50",1, 12),
            GET_topRatedMovies("IMDB_TOP_50",2, 12),
          ]);
        setAllData({
          popular: [...popData.data,...popData_2.data] || [],
          topRated:[...popData.data,...popData_2.data] || [],
          trending: [...trendData_1.data,...trendData_2.data] || [],
        });
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    if(!query){
      fetchAllMoviesData();
    }
    
  },[query]);

  // neu co query thi hien thi cai moi
  if (query) {
    return (
      <div className="container mx-auto p-5">
        <h2 className="text-2xl font-bold mb-6">
          Kết quả tìm kiếm cho: <span className="text-primary">"{query}"</span>
        </h2>
        {/* Truyền từ khóa vào component con để nó tự fetch API */}
        <Search_movieGrid query={query} page={page} limit={limit} />
      </div>
    );
  }

  if (loading) {
    return <LoadingScreen />;
  }
  //hien thi cai cu
  return <>
      <div className="p-5 flex justify-center ">
        <Carousel_topMovie className="flex justify-center" list_movies={allData.popular}/>
      </div>

      <div className="p-5 flex flex-col items-center">
        <h2 className="pl-20 pb-5 font-bold text-3xl">Most popular</h2>
        <Carousel_3_Movies  list_movies={allData.popular} />
      </div>
      <div className="p-5 flex flex-col items-center">
        <h2 className="pl-20 pb-5 font-bold text-3xl">Top rating</h2>
        <Carousel_3_Movies  list_movies={allData.trending}/>
      </div>
    </>
}
