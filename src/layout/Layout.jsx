import { useTheme } from "../context/ThemeContext"; // Import hook
import { House } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SearchForm } from "./SearchForm";
import { Link } from "react-router-dom";
import {
  Display_topMovie,
  Display_popularMovie,
  Display_topRating,
} from "@/layout/Carousel_movie";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <Header />
      <Nav_bar />
      <Outlet/>
      <Footer/>
    </>
  );
}
export function Header() {
  return (
    <div className="flex flex-row justify-around m-1">
      <p>23120398</p>
      <h1>Movies Info</h1>
      <div className="flex flex-row justify-around">
        <Switch id="dark_mode" />
        <Label htmlFor="dark_mode">Change dark mode</Label>
      </div>
    </div>
  );
}
export function Nav_bar() {
  return (
    <div className="flex flex-row justify-between m-1">
      <Link to="/"><House /></Link>
      
      <SearchForm />
    </div>
  );
}

export function Dashboard_movie() {
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
export function Footer(){
  return (
    <div className="flex flex-row justify-center m-1">
      <p>23120398</p>
    </div>
  )
}
