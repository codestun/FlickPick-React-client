// Importing necessary React hooks and components
import React, { useEffect, useState } from "react";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import "./profile-view.scss";

// Importing Bootstrap components for layout
import { Container, Col, Row, Card } from "react-bootstrap";

export const ProfileView = ({ movies = [], user, setUser }) => {
  // Using the useEffect hook to fetch user data when the component mounts
  useEffect(() => {
    // Check if there's a user and token before making the request
    if (!user || !user.token) {
      return;
    }

    // Fetching user details from the API
    fetch(`https://flickpick-1911bf3985c5.herokuapp.com/users/${user.Name}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
    })
      .then(response => response.json())
      .then(data => {
        // Update the user state with the fetched data
        setUser(data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []); // The empty dependency array means this effect will only run once, similar to componentDidMount

  // If the user data hasn't loaded yet, display a loading message
  if (!user) {
    return <div>Loading user information...</div>;
  }

  // Filter the list of movies to get only the user's favorite movies
  const favoriteMovieList = movies.filter((movie) => {
    return user.FavoriteMovies.includes(movie._id);
  });

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              {/* Display the user's information */}
              <UserInfo name={user.Name} email={user.Email} favoriteMovies={user.FavoriteMovies} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              {/* Display the form to update the user's details */}
              <UpdateUser user={user} setUser={setUser} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Display the user's favorite movies */}
      <FavoriteMovies favoriteMovieList={favoriteMovieList} movies={movies} />
    </Container>
  );
}

export default ProfileView;
