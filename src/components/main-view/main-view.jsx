import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

export const MainView = () => {
  // Retrieve user and token from local storage
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

    // Fetch movies from the API using the provided token for authorization
    fetch("https://flickpick-1911bf3985c5.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        // Transform API data into desired format
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
        // Update the movies state with the fetched data
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

  return (
    <Row>
      <Col md={12}>
        {user ? (
          selected ? (
            <MovieView movie={selected} movies={movies} setSelected={setSelected} onBackClick={onBackClick} />
          ) : (
            <div>
              <Row>
                {/* Render movie cards */}
                {movies.map((movie) => (
                  <Col className="mb-5" key={movie.id} md={3}>
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onClick={() => setSelected(movie)}
                    />
                  </Col>
                ))}
              </Row>
              {/* Show the "Logout" button */}
              <button
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
              >
                Logout
              </button>
            </div>
          )
        ) : (
          <Row className="justify-content-center">
            <Col md={5}>
              {/* Show the login view */}
              <LoginView
                onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }}
              />
              or
              {/* Show the signup view */}
              <SignupView />
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};
