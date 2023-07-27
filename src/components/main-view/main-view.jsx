import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "Once",
      Year: "2007",
      Description: "A musical drama about a Dublin street musician and a Czech immigrant who form an unlikely bond through their shared love of music.",
      Director: "John Carney",
      Genre: {
        Name: "Musical, Drama, Romance",
        Description: "Blends heartfelt musical performances with a touching story of love, dreams, and the power of music."
      },
      Director: {
        Name: "John Carney",
        Bio: "John Carney is an Irish filmmaker known for his work in the music genre, including directing 'Once' and 'Sing Street.'",
        BirthYear: 1972,
        DeathYear: null,
        Movies: ["Once"]
      },
      ImagePath: "https://images.moviesanywhere.com/5ba51ace17be67d6d9018312efef29ad/8ad4f1c6-01dd-47a5-bee1-85d444fadfa1.webp?h=375&resize=fit&w=250",
      Featured: true
    },
    {
      id: 2,
      Title: "This Is Spinal Tap",
      Year: "1984",
      Description: "A mockumentary that satirizes the rock music industry, following the fictional British rock band Spinal Tap on their disastrous tour.",
      Genre: {
        Name: "Mockumentary, Comedy",
        Description: "Blends documentary-style filmmaking with comedic elements, offering a humorous critique of the music industry."
      },
      Director: {
        Name: "Rob Reiner",
        Bio: "Rob Reiner is an American actor, comedian, and filmmaker known for directing 'This Is Spinal Tap' as well as other notable films, including 'Stand by Me' and 'The Princess Bride.'",
        BirthYear: 1947,
        DeathYear: null,
        Movies: ["This Is Spinal Tap"]
      },
      ImagePath: "WIP",
      Featured: false
    },
    {
      id: 3,
      Title: "The Last Waltz",
      Year: "1978",
      Description: "A legendary farewell concert by The Band featuring various guest artists.",
      Genre: {
        Name: "Rock, Documentary",
        Description: "Combines elements of rock music and documentary filmmaking to capture the essence of the concert."
      },
      Director: {
        Name: "Martin Scorsese",
        Bio: "Martin Scorsese is an acclaimed American filmmaker known for his contributions to the film industry. He has directed numerous iconic films, including 'Taxi Driver,' 'Goodfellas,' and 'The Departed.'",
        BirthYear: 1942,
        DeathYear: null,
        Movies: ["The Last Waltz", "Shine a Light"]
      },
      ImagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaRLnkXKaZxBn6pV_aLbQqqasptxOZC6EetnGHCvTQTa-t1cSmrvZhBaaypcVsbkO4caE&usqp=CAU",
      Featured: true
    },
    {
      id: 4,
      Title: "Stop Making Sense",
      Year: "1984",
      Description: "The famous music festival held in 1969, capturing the spirit of the counterculture movement.",
      Genre: {
        Name: "Mockumentary, Comedy",
        Description: "Blends documentary-style filmmaking with comedic elements, offering a humorous critique of the music industry."
      },
      Director: {
        Name: "Rob Reiner",
        Bio: "Rob Reiner is an American actor, comedian, and filmmaker known for directing 'This Is Spinal Tap' as well as other notable films, including 'Stand by Me' and 'The Princess Bride.'",
        BirthYear: 1947,
        DeathYear: null,
        Movies: ["This Is Spinal Tap"]
      },
      ImagePath: "WIP",
      Featured: false
    },
    {
      id: 5,
      Title: "Woodstock",
      Year: "1970",
      Description: "An iconic live performance by Talking Heads, known for its innovative staging and energetic performances.",
      Genre: {
        Name: "Documentary, Music",
        Description: "Combines the documentary format with live music performances, providing a comprehensive experience of the festival."
      },
      Director: {
        Name: "Michael Wadleigh",
        Bio: "Michael Wadleigh is an American filmmaker best known for directing the documentary film 'Woodstock,' which documented the iconic music festival.",
        BirthYear: 1942,
        DeathYear: null,
        Movies: ["Woodstock"]
      },
      ImagePath: "https://images.moviesanywhere.com/cdf5f1c926839b792d61b01827117487/c4d26fe8-cfe4-4658-b445-c9ceb26a204e.webp?h=375&resize=fit&w=250",
      Featured: true
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} />;
  }
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => {
            setSelectedMovie(movie);
          }}
        />
      ))}
    </div>
  );
}
