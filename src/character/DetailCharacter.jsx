import React from "react";
import { Calendar, Trophy, Ruler, Briefcase, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MovieCard } from "@/movies_display/MovieCard"; // Import MovieCard đã làm trước đó
import { GET_personDetail, GET_persons } from "@/api/persons";
import {useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
export default function CharacterDetail({ person }) {
  if (!person) return null;

  // 1. Hàm helper format ngày
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 2. Xử lý logic lọc trùng lặp phim trong known_for
  // Dữ liệu API trả về bị trùng ID phim do mỗi vai trò (Actor, Writer) là 1 dòng
  const uniqueMoviesMap = new Map();
  if (person.known_for) {
    person.known_for.forEach((item) => {
      if (!uniqueMoviesMap.has(item.id)) {
        // Map dữ liệu cho khớp với props của MovieCard
        uniqueMoviesMap.set(item.id, {
          id: item.id,
          title: item.title,
          image: item.image,
          year: item.year,
          // Nếu là diễn viên thì lấy tên nhân vật, không thì lấy role
          short_description: item.character ? `Role: ${item.character}` : `Role: ${item.role}`,
          rate: null, // API này không có rate
          genres: []  // API này không có genre
        });
      }
    });
  }
  const uniqueMovies = Array.from(uniqueMoviesMap.values());

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* --- HEADER INFO --- */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Avatar / Portrait */}
        <div className="shrink-0 mx-auto md:mx-0 w-60 md:w-70">
          <div className="aspect-2/3 rounded-lg overflow-hidden shadow-xl border-4 border-white dark:border-gray-800">
            <img
              src={person.image}
              alt={person.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Thông tin Text */}
        <div className="flex-1 space-y-5">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
              {person.name}
            </h1>
            <div className="flex flex-wrap gap-2 text-muted-foreground font-medium">
              {person.role && person.role.split(", ").map((role) => (
                <Badge key={role} variant="secondary" className="text-sm">
                  {role}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-muted/30 p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <span className="block font-semibold text-muted-foreground">Born</span>
                <span>{formatDate(person.birth_date)}</span>
              </div>
            </div>
            
            {person.death_date && (
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-purple-500" />
                <div>
                  <span className="block font-semibold text-muted-foreground">Died</span>
                  <span>{formatDate(person.death_date)}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Ruler className="w-5 h-5 text-green-500" />
              <div>
                <span className="block font-semibold text-muted-foreground">Height</span>
                <span>{person.height}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <div>
                <span className="block font-semibold text-muted-foreground">Awards</span>
                <span className="line-clamp-1" title={person.awards}>{person.awards}</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Briefcase className="w-5 h-5" /> Biography
            </h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {person.summary}
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* --- KNOWN FOR (MOVIES) --- */}
      <div>
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-3">
          Known For
        </h2>
        
        {/* Sử dụng lại MovieCard ở đây */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {uniqueMovies.map((movie) => (
             <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        
        {uniqueMovies.length === 0 && (
          <p className="text-muted-foreground">No movies found.</p>
        )}
      </div>
    </div>
  );
}
export function Display_CharacterDetail(){
    const [character, setCharacter] = useState();
    const {id} = useParams();
    useEffect(()=>{
        async function getCharacter(){
            const data = await GET_personDetail(id);
            if(data){
                setCharacter(data);
            }
        }
        getCharacter();
    },[])
    return (
        <CharacterDetail person ={character}/>
    )
}

