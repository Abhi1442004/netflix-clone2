import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./MovieRow.css";

export default function MovieRow({ title, fetchUrl, isLargeRow = false, searchTerm = "" }) {
  const [movies, setMovies] = useState([]);
  const base = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function load() {
      const res = await axios.get(fetchUrl);
      setMovies(res.data.results || []);
    }
    load();
  }, [fetchUrl]);

  // If a searchTerm passed (not empty) filter locally
  const visible = searchTerm
    ? movies.filter(m => (m.title || m.name || m.original_name || "").toLowerCase().includes(searchTerm.toLowerCase()))
    : movies;

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {visible.length ? visible.map(movie => {
          const path = isLargeRow ? movie.poster_path : movie.backdrop_path;
          if (!path) return null;
          return <img key={movie.id} className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`} src={`${base}${path}`} alt={movie.name || movie.title} />;
        }) : <p className="row__empty">No movies</p>}
      </div>
    </div>
  );
}
