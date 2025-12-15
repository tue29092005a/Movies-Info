import { useTheme } from "../context/ThemeContext"; // Import hook
import { House } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SearchForm } from "./SearchForm";
import { CarouselDemo } from "@/layout/Carousel_movie";
import { MovieCard } from "@/movies_display/MovieCard";
export default function Layout() {
  const { theme, toggleTheme } = useTheme(); // Lấy hàm toggle
  const movies = {
      "id": "tt16360004",
      "title": "Spider-Man: Beyond the Spider-Verse",
      "image": "https://m.media-amazon.com/images/M/MV5BYWJlNThmNWMtZWE5Zi00YWJiLWJiOTQtZWY1Y2I3ZmNhMDYwXkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_Ratio0.6716_AL_.jpg",
      "short_description": "After leaving off from Spider-Man: Across the Spider-Verse, the story continues.",
      "rate": null,
      "genres": [
        "Animation",
        "Action",
        "Adventure",
        "Comedy",
        "Family",
        "Fantasy",
        "Sci-Fi"
      ]
    };
    console.log(movies.id);
  return (
    <>
      <Header />
      <Nav_bar />
      <div className="flex justify-center">
        <CarouselDemo className="self-center" />
      </div>
      <MovieCard movie={movies}/>
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
