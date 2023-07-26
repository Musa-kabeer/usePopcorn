import MovieWatchedList from './MovieWatchedList';

const MoviesWatchedList = ({ watched, onDeleteWatched }) => {
  return (
    <ul className="list">
      {watched?.map((movie) => (
        <MovieWatchedList
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
};

export default MoviesWatchedList;
