import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Col, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

export const MainView = () => {
  // Retrieve user and token from local storage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  // State variables
  const [user, setUser] = useState(storedUser);   // State for the current user
  const [token, setToken] = useState(storedToken); // State for the user's token
  const [movies, setMovies] = useState([]);   // State to hold the list of movies
  const [selected, setSelected] = useState(null);   // State to keep track of the selected movie

  const fetchUserDetails = (username) => {
    fetch(`https://flickpick-1911bf3985c5.herokuapp.com/users/${username}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(userData => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      })
      .catch(error => {
        console.error("Error fetching user details:", error);
      });
  }
  // Only fetch movies if I have a token
  useEffect(() => {
    if (!token) return;

    fetch("https://flickpick-1911bf3985c5.herokuapp.com/movies", {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((movies) => {
        // Log the movie details
        console.log("API Response:", movies);
        movies.forEach(movie => {
          console.log(`Director details for movie '${movie.Title}':`, movie.Director);
        });
        // Transform API data into desired format
        const moviesFromApi = movies.map((movie) => ({
          _id: movie._id,
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
            Movies: movie.Director.Movies
          },
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  if (!token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            <>
              <NavigationBar user={null} onLoggedOut={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }} />
              <Col md={5} className="mx-auto">
                <LoginView onLoggedIn={(userData, token) => {
                  setUser(userData);
                  setToken(token);
                }} />
              </Col>
            </>
          } />
          <Route path="/signup" element={
            <>
              <NavigationBar user={null} onLoggedOut={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }} />
              <Col md={5} className="mx-auto">
                <SignupView />
              </Col>
            </>
          } />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // Function to handle the "Back" button click and reset the selected movie state
  const onBackClick = () => {
    setSelected(null);
  };

  // Loading state for when movies have not been fetched yet
  if (!movies.length) {
    return <div className="text-white">Loading movies...</div>;
  }

  return (
    <BrowserRouter>
      <Row className="main-view justify-content-md-center">
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
          }}
        />
        <Routes>
          // Route for the Signup View
          <Route path="/signup" element={<Col md={5}><SignupView /></Col>} />

          // Route for the Login View. If the user is already logged in, navigate to the main page
          <Route
            path="/login"
            element={
              user ?
                <Navigate to="/" /> :
                <Col md={5}>
                  <LoginView onLoggedIn={(userData, token) => {
                    setUser(userData);
                    setToken(token);
                  }} />
                </Col>
            }
          />

          // Route for the User Profile View. Redirect to Login if the user is not authenticated
          <Route path="/users/:name" element={user ? <Col md={8}><ProfileView movies={movies} onBackClick={onBackClick} /></Col> : <Navigate to="/login" replace />} />

          // Route for individual movie view
          <Route path="/movies/:movieId" element={user ? (
            movies.length === 0 ? <Col>The list is empty!</Col> : (
              <Col md={8}>
                {/* Pass the movie prop to the MovieView component */}
                <MovieView movie={selected} movies={movies} onBackClick={onBackClick} favoriteMovies={user.FavoriteMovies} fetchUserDetails={fetchUserDetails} />
              </Col>
            )
          ) : (
            <Navigate to="/login" replace />
          )} />

          // Route for the main movie list
          <Route path="/" element={user ? (
            movies.length === 0 ? (
              <Col className="white-text">The list is empty!</Col>
            ) : (
              <>
                {/* Render movie cards */}
                <Row>
                  {movies.map(movie => (
                    <Col className="mb-4" key={movie._id} md={3}>
                      {/* Pass movie object to the MovieCard component */}
                      <MovieCard movie={movie} favoriteMovies={user.FavoriteMovies} fetchUserDetails={fetchUserDetails} />
                    </Col>
                  ))}
                </Row>
                {/* Show the "Logout" button */}
                <Row>
                  <Col md={2}>
                    {/* Use Link component to navigate to /login and clear data */}
                    <Link
                      to="/login"
                      onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}
                      className="btn btn-danger"
                    >
                      Logout
                    </Link>
                  </Col>
                </Row>
              </>
            )
          ) : (
            <Navigate to="/login" replace />
          )} />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
