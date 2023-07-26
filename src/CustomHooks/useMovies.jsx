import { useEffect, useState } from 'react';

//  IMDB
const KEY = 'd0a7a658';

const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // callback?.();
    const controller = new AbortController();

    async function fetchMovies() {
      // Creating an Abort Controller instance
      try {
        // SET TO DEFAULT AT FIRST
        setIsLoading(true);
        setError('');

        // THEN START FETCHING
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error('Something went wrong while fetching data');

        const data = await res.json();

        if (data.Response === 'False')
          throw new Error('No Movie Found...');

        setMovies(data.Search);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
        setError('');
      }
    }

    // CHECK QUERY LENGTH FIRST BEACUSE IF QUERY IS NOT >= 3 NOTHING WILL BE FOUND
    if (query.length < 2) {
      setMovies([]);
      setError('');
      return;
    }

    // handleCloseMovie();
    // START FETCHING
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
};

export default useMovies;
