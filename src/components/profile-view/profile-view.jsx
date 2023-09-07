// Importing necessary React hooks and components
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import "./profile-view.scss";

// Importing Bootstrap components for layout
import { Container, Col, Row, Card } from "react-bootstrap";

export const ProfileView = ({ movies = [] }) => {
  const [user, setUser] = useState();   // State for the current user
  const [fetchUser, setFetchUser] = useState();   // State for the current user
  const dispatch = useDispatch();
  // Using the useEffect hook to fetch user data when the component mounts
  const userStored = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  console.log('userStored: ', userStored);
  console.log('token: ', token);
  // Check if there's a user and token before making the request
  if (!userStored || !token) {
    console.log('exiting profile view');
    return;
  }
  useEffect(() => {
    // Fetching user details from the API
    fetch(`https://flickpick-1911bf3985c5.herokuapp.com/users/${userStored.Name}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => response.json()
      )
      .then(userData => {
        // Update the user state with the fetched data
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        // Update the Redux store with the user data
        dispatch(setUser(userData));
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, [fetchUser]); // The empty dependency array means this effect will only run once, similar to componentDidMount

  // If the user data hasn't loaded yet, display a loading message
  if (!user) {
    return <div className="text-white">Loading user information...</div>;
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
      <FavoriteMovies favoriteMovieList={favoriteMovieList} onUserToUpdate={() => { setFetchUser(!fetchUser) }} />
    </Container>
  );
}

export default ProfileView;
