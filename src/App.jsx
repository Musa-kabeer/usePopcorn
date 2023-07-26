import { useRef, useState } from 'react';
import Navbar from './components/Header/Navbar';
import NumResult from './components/Header/NumResult';
import Main from './components/Main/Main';
import MoviesListBox from './components/Main/MoviesListBox';
import Loader from './components/Main/Loader';
import ErrorMessage from './components/Main/ErrorMessage';
import MoviesList from './components/Main/MoviesList';
import WatchedSummary from './components/Main/WatchedSummary';
import MoviesWatchedList from './components/Main/MoviesWatchedLists';
import Search from './components/Header/Search';
import MovieDetails from './components/Main/MovieDetails';
import useMovies from './CustomHooks/useMovies';
import useLocalStorage from './CustomHooks/useLocalStorage';
import useKey from './CustomHooks/useKey';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const inputEl = useRef(null);

  const [watched, setWatched] = useLocalStorage('watched');

  // FETCH FOR MOVIES
  const { movies, isLoading, error } = useMovies(query);

  // HANDLE LIST SELECTION
  function handleMovieSelection(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleMovieWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  const handleDeleteWatched = (id) => {
    setWatched((watched) =>
      watched.filter((watched) => watched.imdbID !== id)
    );
  };

  // REF USE CASES && FOR SELECTING DOM ELEMENT
  useKey('Enter', function () {
    if (document.activeElement === inputEl.current) return;

    setQuery('');
    inputEl.current.focus();
  });

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} inputEl={inputEl} />
        <NumResult movies={movies} />
      </Navbar>

      <Main>
        <MoviesListBox>
          {isLoading && <Loader />}
          
          {!isLoading && !error && (
            <MoviesList
              movies={movies}
              onSelectMovie={handleMovieSelection}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </MoviesListBox>

        <MoviesListBox>
          {selectedId ? (
            <MovieDetails
              watched={watched}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleMovieWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <MoviesWatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </MoviesListBox>
      </Main>
    </>
  );
}
