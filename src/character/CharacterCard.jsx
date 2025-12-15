import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
export function CharacterCard({actor}) {
  if(!actor){
    return null;
  }

  return (
    <Card
      key={actor.id}
      className="overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-3/4 overflow-hidden bg-muted">
        {actor.image ? (
          <img
            src={actor.image}
            alt={actor.name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm truncate" title={actor.name}>
          {actor.name}
        </h3>
        <p
          className="text-xs text-muted-foreground truncate"
          title={actor.character}
        >
          as {actor.character}
        </p>
      </div>
    </Card>
  );
}

export function Link_CharacterCard({actor}){
    if(!actor)return null;

    return (
        <Link to={`/persons/${actor.id}`} >
            <CharacterCard actor={actor}/>  
        </Link>
    )
}