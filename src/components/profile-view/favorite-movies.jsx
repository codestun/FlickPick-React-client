import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Figure, Row } from "react-bootstrap";
import "./profile-view.scss";

function FavoriteMovies({ favoriteMovieList, onUserToUpdate }) {
  console.log("User's favorite movie IDs:", favoriteMovieList.map(movie => movie._id));

  const removeFav = (_id) => {
    let token = localStorage.getItem("token");
    let user = JSON.parse(localStorage.getItem("user"));

    let url = `https://flickpick-1911bf3985c5.herokuapp.com/users/${user.Name}/movies/${_id}`;
    fetch(url, {
      method: "DELETE",
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
        //tell the parent component to fetch the user info again
        onUserToUpdate();
        console.log("Movie removed from favorites:", data);
      })
      .catch(error => {
        console.error("Error removing movie from favorites:", error);
      });
  };

  return (
    <Card>
      <Card.Body>
        <Row className="text-white">
          <Col xs={12} md={4}>
            <h4>Favorite Movies</h4>
          </Col>
        </Row>
        <Row>
          {favoriteMovieList.map(({ ImagePath, Title, _id }) => {
            if (!favoriteMovieList.length) {
              return <div>You have no favorite movies.</div>;
            }
            return (
              <Col xs={12} md={6} lg={3} key={_id} className="fav-movie">
                <Figure>
                  <Link to={`/movies/${_id}`}>
                    <Figure.Image src={ImagePath} alt={Title} />
                    <Figure.Caption>{Title}</Figure.Caption>
                  </Link>
                </Figure>
                <Button variant="danger" onClick={() => removeFav(_id)}>
                  Remove
                </Button>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default FavoriteMovies;
