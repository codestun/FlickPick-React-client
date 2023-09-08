import React from "react";
import { useSelector } from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import { Col, Row } from "react-bootstrap";

export const MoviesList = ({ fetchUserDetails }) => {
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);

  const filter = useSelector((state) =>
    state.movies.filter).trim().toLowerCase();
  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(filter)
  );

  return (
    <>
      <Row>
        {movies.length === 0 ? (
          <Col>The list is empty!</Col>
        ) : (
          filteredMovies.map((movie) => (
            <Col className="mb-4" key={movie._id} md={3}>
              <MovieCard
                movie={movie}
                favoriteMovies={user.FavoriteMovies}
                fetchUserDetails={fetchUserDetails}
              />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};
