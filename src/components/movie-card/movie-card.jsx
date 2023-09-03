import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// MovieCard component to display individual movies in a card format
export const MovieCard = ({ movie }) => {
  // Retrieve user details and token from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [isFavorite, setIsFavorite] = useState(false); // State to check if movie is added to favorites


  // Function to add a movie to user's favorites
  const handleFavorite = (_id) => {
    let url = `https://flickpick-1911bf3985c5.herokuapp.com/users/${user.Name}/movies/${_id}`;
    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(data => {
        console.log("Movie added to favorites:", data);
        console.log("User's favorite movies:", data.FavoriteMovies);
        setIsFavorite(true); // Set movie as favorite
      })
      .catch(error => {
        console.error("Error adding movie to favorites:", error);
        alert("Movie might already be in your favorites or an error occurred.");
      });
  };

  return (
    <Card className="h-100 border border-primary text-bg-dark d-flex flex-column">
      {/* Movie image that acts as a link to detailed view */}
      <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        <Card.Img variant="top" src={movie.ImagePath} />
      </Link>
      <Card.Body className="flex-grow-1 d-flex flex-column">
        {/* Movie title */}
        <Card.Title>{movie.Title}</Card.Title>
        {/* Director's name */}
        <Card.Text>{movie.Director.Name}</Card.Text>
        {/* Button to add movie to favorites */}
        <Button variant={isFavorite ? "danger" : "secondary"} onClick={() => handleFavorite(movie._id)}>
          Favorite
        </Button>
      </Card.Body>
    </Card>
  );
};

// PropTypes for type checking and ensuring required data is provided
MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string,
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
};
