import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, favoriteMovies, fetchUserDetails }) => {
  // Retrieve user details and token from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const isMovieFavorite = favoriteMovies?.includes(movie._id);
  const [isFavorite, setIsFavorite] = useState(isMovieFavorite);

  useEffect(() => {
    setIsFavorite(favoriteMovies?.includes(movie._id));
  }, [favoriteMovies, movie._id]);

  const handleFavoriteToggle = (_id) => {
    let url = `https://flickpick-1911bf3985c5.herokuapp.com/users/${user.Name}/movies/${_id}`;

    if (isFavorite) {
      // If the movie is already a favorite, then make a DELETE request to remove it from favorites
      fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          if (!response.ok) throw new Error(response.statusText);
          setIsFavorite(false); // Update the state to reflect that the movie is no longer a favorite
          fetchUserDetails(user.Name);
        })
        .catch(error => {
          console.error("Error removing movie from favorites:", error);
          alert("Error occurred while trying to remove the movie from favorites.");
        });
    } else {
      // If the movie is not a favorite, then make a POST request to add it to favorites
      fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          if (!response.ok) throw new Error(response.statusText);
          setIsFavorite(true); // Update the state to reflect that the movie is now a favorite
          fetchUserDetails(user.Name);
        })
        .catch(error => {
          console.error("Error adding movie to favorites:", error);
          alert("Error occurred while trying to add the movie to favorites.");
        });
    }
  };

  return (
    <Card className="h-100 border border-primary text-bg-dark d-flex flex-column">
      {/* Movie image that acts as a link to detailed view */}
      <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        <Card.Img variant="top" src={movie.ImagePath} />
      </Link>
      <Card.Body className="d-flex flex-column justify-content-between">
        {/* Movie title */}
        <Card.Title>{movie.Title}</Card.Title>
        {/* Director's name */}
        <Card.Text>{movie.Director.Name}</Card.Text>
        {/* Button to toggle movie favorite status */}
        <Button variant={isFavorite ? "danger" : "secondary"} onClick={() => handleFavoriteToggle(movie._id)}>
          {isFavorite ? "Unfavorite" : "Favorite"}
        </Button>

      </Card.Body>
    </Card>
  );
};

// PropTypes for type checking and ensuring required data is provided
MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.number.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      BirthYear: PropTypes.number,
      DeathYear: PropTypes.number,
      Movies: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
  }).isRequired,
  favoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchUserDetails: PropTypes.func.isRequired
};
