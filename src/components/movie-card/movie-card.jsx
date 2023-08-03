// Import PropTypes library
import PropTypes from "prop-types";

// Add MovieCard function component
export const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      onClick={() => {
        onClick(movie);
      }}
    >
      {movie.Title}
    </div>
  );
};

// Define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
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
      BirthYear: PropTypes.number.isRequired,
      DeathYear: PropTypes.number,
      Movies: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
