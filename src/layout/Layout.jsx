import { useTheme } from "../context/ThemeContext"; // Import hook
import { House } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SearchForm } from "./SearchForm";
import { Link, useSearchParams } from "react-router-dom";
import {
  Display_topMovie,
  Display_popularMovie,
  Display_topRating,
} from "@/layout/Carousel_movie";
import { Outlet } from "react-router-dom";
import Search_movieGrid from "@/movies_display/MovieGrid";
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
  const { toggleTheme} = useTheme();
  return (
    <div className={`flex flex-row justify-around p-1 `}>
      <p>23120398</p>
      <h1>Movies Info</h1>
      <div className="flex flex-row justify-around">
        <Switch id="dark_mode" onClick={toggleTheme} />
        <Label htmlFor="dark_mode">Change dark mode</Label>
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

export function Dashboard_movie() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 12;

  // lay currentPage
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
  //hien thi cai cu
  return (
    <NoQuery_Dashboard/>
  );
}
export function Footer() {
  return (
    <div className="flex flex-row justify-center m-1">
      <p>23120398</p>
    </div>
  );
}
export function NoQuery_Dashboard()
{
  return <>
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
}