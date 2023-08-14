import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  // State to hold the list of movies
  const [movies, setMovies] = useState([]);

  // State to keep track of the selected movie
  const [selected, setSelected] = useState(null);

  // Fetch movies data from the API
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://flickpick-1911bf3985c5.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
        // Map the API data into the required format
        const moviesFromApi = movies.map((movie) => ({
          id: movie._id,
          Title: movie.Title,
          ImagePath: movie.ImagePath,
          Year: movie.Year,
          Description: movie.Description,
          Genre: {
            Name: movie.Genre.Name,
            Description: movie.Genre.Description,
          },
          Director: {
            Name: movie.Director.Name,
            Bio: movie.Director.Bio,
            BirthYear: movie.Director.BirthYear,
            DeathYear: movie.Director.DeathYear,
            Movies: movie.Director.Movies,
          },
        }));
        // Set the movies state with the data from the API
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token]);

  // Function to handle the "Back" button click and reset the selected movie state
  const onBackClick = () => {
    setSelected(null);
  };

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  // If a movie is selected, show its details and similar movies
  if (selected) {
    const similarMovies = movies.filter(
      (movie) =>
        movie.Genre.Name === selected.Genre.Name && movie.id !== selected.id
    );

    return (
      <div>
        {/* Show the details of the selected movie */}
        <MovieView movie={selected} onBackClick={onBackClick} />

        {/* Show the "Similar Movies" section if there are similar movies */}
        {similarMovies.length > 0 && (
          <div>
            <h2>Similar Movies</h2>
            <div>
              {/* Loop through and display similar movies */}
              {similarMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => setSelected(movie)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Show a message when no similar movies are found */}
        {similarMovies.length === 0 && <p>No similar movies found.</p>}
        <br />

        {/* Show the "Back" button */}
        <div>
          <button onClick={onBackClick}
            className="back-button"
            style={{ cursor: "pointer" }}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  // If no movie is selected, show the list of all movies
  return (
    <div>
      {/* Loop through and display all movies */}
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => setSelected(movie)}
        />
      ))}
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>
  );
};
