import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";

export const MainView = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: "Once" },
    { id: 2, title: "This Is Spinal Tap" },
    { id: 3, title: "The Last Waltz" },
    { id: 4, title: "Stop Making Sense" },
    { id: 5, title: "Woodstock" }
  ]);

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
