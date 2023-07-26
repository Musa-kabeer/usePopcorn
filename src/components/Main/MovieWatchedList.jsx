const MovieWatchedList = ({ movie, onDeleteWatched }) => {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{Math.floor(movie.imdbRating)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{Math.floor(movie.userRating)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Math.floor(movie.runtime)} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
};

export default MovieWatchedList;
