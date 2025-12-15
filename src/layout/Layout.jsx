import { useTheme } from "../context/ThemeContext"; // Import hook
import { House } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SearchForm } from "./SearchForm";
import { CarouselDemo } from "@/layout/Carousel_movie";
import { MovieCard } from "@/movies_display/MovieCard";
import { Display_topMovie } from "@/layout/Carousel_movie";
export default function Layout() {

  return (
    <>
      <Header />
      <Nav_bar />
      <div className="flex justify-center">
        <CarouselDemo className="self-center" />
      </div>
      <Display_topMovie/>
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
      <House />
      <SearchForm />
    </div>
  );
}
