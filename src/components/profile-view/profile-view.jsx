import React, { useEffect, useState } from "react";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import "./profile-view.scss"

import { Container, Col, Row, Card } from "react-bootstrap";

export function ProfileView({ movies }) {
  const [user, setUser] = useState({
    Name: '',
    Email: '',
    FavoriteMovies: []
  });

  const favoriteMovieList = movies.filter((movies) => {
    return user.FavoriteMovies.includes(movies._id);
  });

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.Name} email={user.Email} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser user={user} setUser={setUser} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <FavoriteMovies favoriteMovieList={favoriteMovieList} />
    </Container>
  );
}

export default ProfileView;
