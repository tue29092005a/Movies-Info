import React from "react";
import { Star, Clock, Calendar, Trophy, Globe, DollarSign, Clapperboard } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import{useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { GET_movieDetail } from "@/api/movies";
import { CharacterCard, Link_CharacterCard } from "@/character/CharacterCard";
export default function MovieDetail({ movie }) {
  if (!movie) return null;

  return (
    <div className="container mx-auto py-8 px-4 md:px-8 max-w-7xl">
      {/* --- HERO SECTION --- */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Poster Ảnh */}
        <div className="shrink-0 mx-auto md:mx-0 w-62.5 md:w-75">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-auto rounded-lg shadow-2xl object-cover aspect-2/3"
          />
        </div>

        {/* Thông tin chính */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">
              {movie.full_title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-muted-foreground text-sm md:text-base">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {movie.year}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {movie.runtime}
              </span>
              {movie.countries && (
                <span className="flex items-center gap-1">
                  <Globe className="w-4 h-4" /> {movie.countries.join(", ")}
                </span>
              )}
            </div>
          </div>

          {/* Ratings */}
          <div className="flex flex-wrap gap-4">
            {movie.ratings?.imDb && (
              <div className="flex items-center gap-2 bg-yellow-500/10 px-3 py-1 rounded-md border border-yellow-500/20">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-lg text-yellow-600 dark:text-yellow-400">
                  {movie.ratings.imDb}<span className="text-xs font-normal text-muted-foreground">/10 (IMDb)</span>
                </span>
              </div>
            )}
            {movie.ratings?.rottenTomatoes && (
              <div className="flex items-center gap-2 bg-red-500/10 px-3 py-1 rounded-md border border-red-500/20">
                <span className="text-xl">🍅</span>
                <span className="font-bold text-lg text-red-600 dark:text-red-400">
                  {movie.ratings.rottenTomatoes}%
                </span>
              </div>
            )}
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {movie.genres?.map((genre) => (
              <Badge key={genre}  variant="secondary" className="text-sm px-3 py-1">
                {genre}
              </Badge>
            ))}
          </div>

          {/* Director & Awards Quick View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
             <div className="flex items-start gap-2">
                <Clapperboard className="w-5 h-5 text-primary mt-0.5" />
                <div>
                   <span className="font-semibold block">Đạo diễn:</span>
                   <span className="text-muted-foreground">
                      {movie.directors?.map(d => d.name).join(", ")}
                   </span>
                </div>
             </div>
             {movie.awards && (
                <div className="flex items-start gap-2">
                   <Trophy className="w-5 h-5 text-yellow-500 mt-0.5" />
                   <div>
                      <span className="font-semibold block">Giải thưởng:</span>
                      <span className="text-muted-foreground text-sm">{movie.awards}</span>
                   </div>
                </div>
             )}
          </div>
        </div>
      </div>

      {/* --- TABS CONTENT --- */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-125 mb-6">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="cast">Diễn viên ({movie.actors?.length || 0})</TabsTrigger>
          <TabsTrigger value="reviews">Đánh giá ({movie.reviews?.length || 0})</TabsTrigger>
        </TabsList>

        {/* TAB 1: OVERVIEW */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Cột trái: Nội dung phim */}
             <Card className="md:col-span-2 border-none shadow-none bg-transparent p-0">
                <CardHeader className="px-0 pt-0">
                   <CardTitle>Nội dung phim</CardTitle>
                </CardHeader>
                <CardContent className="px-0 text-lg leading-relaxed text-muted-foreground">
                   {/* Xử lý HTML string an toàn */}
                   <div dangerouslySetInnerHTML={{ __html: movie.plot_full }} />
                </CardContent>
             </Card>

             {/* Cột phải: Thông tin chi tiết */}
             <Card>
                <CardHeader>
                   <CardTitle className="text-base">Thông tin chi tiết</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                   <div>
                      <span className="font-medium text-muted-foreground block mb-1">Doanh thu phòng vé</span>
                      <div className="space-y-1">
                         {movie.box_office?.budget && (
                            <div className="flex justify-between border-b pb-1">
                               <span>Kinh phí:</span>
                               <span className="font-medium">{movie.box_office.budget}</span>
                            </div>
                         )}
                         {movie.box_office?.cumulativeWorldwideGross && (
                            <div className="flex justify-between border-b pb-1">
                               <span>Toàn cầu:</span>
                               <span className="font-medium text-green-600 dark:text-green-400">
                                  {movie.box_office.cumulativeWorldwideGross}
                               </span>
                            </div>
                         )}
                      </div>
                   </div>
                   
                   <div>
                      <span className="font-medium text-muted-foreground block mb-1">Ngôn ngữ</span>
                      <p>{movie.languages?.join(", ")}</p>
                   </div>
                </CardContent>
             </Card>
          </div>
        </TabsContent>

        {/* TAB 2: CAST (Diễn viên) */}
        <TabsContent value="cast">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movie.actors?.map((actor) => (
                <Link_CharacterCard actor={actor}/>
            ))}
          </div>
        </TabsContent>

        {/* TAB 3: REVIEWS (Đánh giá) */}
        <TabsContent value="reviews">
          <div className="grid grid-cols-1 gap-4">
            {movie.reviews?.map((review, index) => (
              <Card key={index} className="bg-card/50">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                       <Avatar className="h-8 w-8">
                          <AvatarFallback>{review.user.slice(0,2).toUpperCase()}</AvatarFallback>
                       </Avatar>
                       <div>
                          <h4 className="font-bold text-sm">{review.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                             <span>by {review.user}</span>
                             <span>•</span>
                             <span>{new Date(review.date).toLocaleDateString()}</span>
                          </div>
                       </div>
                    </div>
                    {review.rate && (
                       <Badge variant="outline" className="flex gap-1 items-center">
                          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                          {review.rate}
                       </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-full max-h-37.5">
                     <p className="text-sm text-muted-foreground leading-relaxed">
                        {review.content}
                     </p>
                  </ScrollArea>
                </CardContent>
              </Card>
            ))}
            
            {(!movie.reviews || movie.reviews.length === 0) && (
               <p className="text-center text-muted-foreground py-8">Chưa có đánh giá nào.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}


export function Display_MovieDetail(){
    const [movieDetail, setMovieDetail] = useState({});
    // lay param
    // roi fetch data
    const {id} = useParams();
    useEffect(()=>{
        async function getMovieDetail(){
            const data = await GET_movieDetail(id);
            if(data){
                setMovieDetail(data);
            }
        }
        getMovieDetail();
    },[id])
    return (
        <MovieDetail movie = {movieDetail}/>
    )
}