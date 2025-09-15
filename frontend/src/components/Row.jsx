import React from "react";
import "./Row.css";

function Row({ title, movies }) {
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <div key={movie.id} className="row__movie">
            <img
              className="row__poster"
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
              alt={movie.title || movie.name}
            />
            <p className="row__title">{movie.title || movie.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
