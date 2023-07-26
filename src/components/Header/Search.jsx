import { useEffect } from 'react';

const Search = ({ query, setQuery, inputEl }) => {
  useEffect(() => {
    inputEl.current.focus();
  }, [inputEl]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

export default Search;
