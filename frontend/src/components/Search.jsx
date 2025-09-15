import React, { useState } from "react";
import axios from "../api/axios";
import "./Search.css";

function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const res = await axios.get(
        `/search/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&query=${query}`
      );
      setMovies(res.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="search__results">
        {movies.map((movie) => (
          <div key={movie.id} className="search__movieContainer">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name}
            />
            <p className="search__movieTitle">{movie.title || movie.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
