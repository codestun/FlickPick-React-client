import { useParams, Link } from "react-router-dom";
import "./movie-view.scss";
import Col from 'react-bootstrap/Col';
import Row from "react-bootstrap/Row";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  // Find the selected movie from the movies array using the movieId
  const movie = movies.find((m) => m.id === movieId);

  // Extract the genre name from the movie object
  const genreName = movie.Genre.Name;

  // Filter similar movies
  const similarMovies = movies.filter(
    (m) => m.Genre.Name === genreName && m.id !== movie.id
  );

  return (
    <Row className="justify-content-md-center">
      <Col md={8} style={{ border: "1px solid black" }}>
        <div>
          <div>
            <img className="w-100" src={movie.ImagePath} alt={movie.Title} />
          </div>
          <div className="white-text">
            <h1>{movie.Title}</h1>
            <div>
              <span>Year: </span>
              <span>{movie.Year}</span>
            </div>
            <div>
              <span>Description: </span>
              <span>{movie.Description}</span>
            </div>
            <span>Genre: </span>
            <ul>
              <li>
                <span>Name: {genreName}</span>
              </li>
              <li>
                <span>Description: {movie.Genre.Description}</span>
              </li>
            </ul>
          </div>
          <div className="white-text">
            <span>Director: </span>
            <ul>
              <li>
                <span>Name: {movie.Director.Name}</span>
              </li>
              <li>
                <span>Bio: {movie.Director.Bio}</span>
              </li>
              <li>
                <span>Birth Year: {movie.Director.BirthYear}</span>
              </li>
              {movie.Director.DeathYear && (
                <li>
                  <span>Death Year: {movie.Director.DeathYear}</span>
                </li>
              )}
              <li>
                <span>Movies: {movie.Director.Movies.join(", ")}</span>
              </li>
            </ul>
          </div>
          <div className="white-text">
            <h2>Similar Movies</h2>
            {similarMovies.length > 0 ? (
              <Row>
                {similarMovies.map((similarMovie) => (
                  <Col className="mb-5" key={similarMovie.id} xs={12} sm={8} md={6} lg={4}>
                    <MovieCard
                      key={similarMovie.id}
                      movie={similarMovie}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <p>No similar movies found.</p>
            )}
            <br />
            {/* Show the "Back" button */}
            <div>
              <Link to={`/`}>
                <button className="btn btn-back">Back</button>
              </Link>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};
