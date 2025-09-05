import React, { useEffect, useState } from "react";
import axios from "../axios";
import requests from "../requests";
import "./Banner.css";

export default function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await axios.get(requests.fetchTrending);
      const items = res.data.results || [];
      if (items.length) setMovie(items[Math.floor(Math.random() * items.length)]);
    }
    load();
  }, []);

  const bg = movie?.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : "";

  const truncate = (s, n) => s?.length > n ? s.substr(0, n - 1) + "..." : s;

  return (
    <header className="banner" style={{ backgroundImage: `url(${bg})` }}>
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.title || movie?.name || ""}</h1>
        <div className="banner__buttons">
          <button className="banner__btn">▶ Play</button>
          <button className="banner__btn">+ My List</button>
        </div>
        <p className="banner__description">{truncate(movie?.overview, 150)}</p>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}
