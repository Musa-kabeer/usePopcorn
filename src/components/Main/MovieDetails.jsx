import { useState, useEffect, useRef } from 'react';
import StarRating from '../StarRating';
import Loader from './Loader';
import useKey from '../../CustomHooks/useKey';

const KEY = 'd0a7a658';

const MovieDetails = ({
  watched,
  selectedId,
  onCloseMovie,
  onAddWatched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setLoading] = useState('');
  const [userRating, setUserRating] = useState('');

  const countRef = useRef(0);

  // IF isWatched is true show Ratig btn else show the text of course
  const isWatched = watched
    ?.map((movie) => movie.imdbID)
    .includes(selectedId);

  const watchedUserRating = watched?.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  useEffect(() => {
    if (userRating) countRef.current += +1;
  }, [userRating]);

  const {
    Actors: actors,
    Title: title,
    Poster: poster,
    Released: released,
    Runtime: runtime,
    Year: year,
    imdbRating,
    Plot: plot,
    Director: director,
  } = movie;

  function handleAdd() {
    const newAddMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
      currentRatingDecisions: countRef.current,
    };

    onAddWatched(newAddMovie);
    onCloseMovie();
  }

  useEffect(() => {
    if (!selectedId) return;

    async function getMovieById() {
      setLoading(true);

      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );

      const data = await res.json();
      setLoading(false);

      setMovie(data);
    }

    getMovieById();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;

    document.title = `usePopcorn | ${title}`;

    return () => {
      document.title = 'usePopcorn';
    };
  }, [title]);

  useKey('Escape', onCloseMovie);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {isWatched ? (
                <p>
                  You rated the movie {watchedUserRating}{' '}
                  <span>⭐</span>
                </p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={30}
                    setUserRating={setUserRating}
                  />
                  {userRating > 1 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring by {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
