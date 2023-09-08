import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { setMovies } from "../../redux/reducers/movies";
import { MovieCard } from "../movie-card/movie-card";
import { MoviesList } from "../movies-list/movies-list";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Col, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

export const MainView = () => {
  const movies = useSelector((state) => state.movies.list); // State to hold the list of movies
  const user = useSelector((state) => state.user); // State for the current user
  const dispatch = useDispatch(); // <-- This line initializes the dispatch function
  // Retrieve user and token from local storage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  // State variables
  // const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken); // State for the user's token
  // const [movies, setMovies] = useState([]);
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
        console.log("Movies from API:", movies);
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
        dispatch(setMovies(moviesFromApi));
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
  if (!movies || !movies.length) {
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
                <MovieView movie={selected} onBackClick={onBackClick} favoriteMovies={user.FavoriteMovies} fetchUserDetails={fetchUserDetails} />
              </Col>
            )
          ) : (
            <Navigate to="/login" replace />
          )} />

          // Route for the main movie list
          <Route
            path="/"
            element={
              <>
                {!user ? <Navigate to="/login" replace /> : (movies && movies.length ? <MoviesList fetchUserDetails={fetchUserDetails} /> : <div>No movies available</div>)}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
