import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Button, Col, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";


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

  const updateUser = user => {
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
  }

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
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
        className="navbar navbar-dark bg-black"
      />
      {/* Row for centering content */}
      <Row className="justify-content-md-center white-text">
        <Routes>
          {/* Route for the signup view */}
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Col md={5}><SignupView /></Col>} />
          {/* Route for the login view */}
          {/* <Route path="/login" element={user ? <Navigate to="/" /> : <Col md={5}><LoginView onLoggedIn={user => setUser(user)} /></Col>} /> */}
          <Route path="/login" element={user ? <Navigate to="/" /> : <Col md={5}><LoginView onLoggedIn={user => { setUser(user); setToken(user.token); }} /></Col>} />

          {/* Route for the updateUser view */}
          <Route
            path="/users/:name"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <ProfileView
                  movies={movies}
                  user={user}
                  token={token}
                  setUser={setUser}
                />
              )
            }
          />
          {/* Route for individual movie view */}
          <Route path="/movies/:movieId" element={user ? (
            movies.length === 0 ? <Col>The list is empty!</Col> : (
              <Col md={8}>
                {/* Pass the movie prop to the MovieView component */}
                <MovieView movie={selected} movies={movies} onBackClick={onBackClick} />
              </Col>
            )
          ) : (
            <Navigate to="/login" replace />
          )} />
          {/* Route for the main movie list */}
          <Route path="/" element={user ? (
            movies.length === 0 ? <Col className="white-text">The list is empty!</Col> : (
              <>
                {/* Render movie cards */}
                <Row>
                  {movies.map(movie => (
                    <Col className="mb-4" key={movie.id} md={3}>
                      {/* Pass movie object to the MovieCard component */}
                      <MovieCard movie={movie} onClick={() => setSelected(movie)} />
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
