export const MovieCard = ({ movie, onClick }) => { // Updated prop name to 'onClick'
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
