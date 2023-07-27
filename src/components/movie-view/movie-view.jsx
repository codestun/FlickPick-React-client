export const MovieView = ({ movie }) => {
  return (
    <div>
      <div>
        <img src={movie.ImagePath} alt={movie.Title} />
      </div>
      <div>
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
            <span>Name: {movie.Genre.Name}</span>
          </li>
          <li>
            <span>Description: {movie.Genre.Description}</span>
          </li>
        </ul>
      </div>
      <div>
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
      <div>
      </div>
    </div>
  );
};

