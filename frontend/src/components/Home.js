import React, { useState } from "react";
import Banner from "./Banner";
import MovieRow from "./MovieRow";
import requests from "../requests";
import "./Home.css";
import Navbar from "./Navbar";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="home">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Banner />

      <div className="rows">
        <MovieRow title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow searchTerm={searchTerm} />
        <MovieRow title="Trending Now" fetchUrl={requests.fetchTrending} searchTerm={searchTerm} />
        <MovieRow title="Top Rated" fetchUrl={requests.fetchTopRated} searchTerm={searchTerm} />
        <MovieRow title="Action Movies" fetchUrl={requests.fetchActionMovies} searchTerm={searchTerm} />
        <MovieRow title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} searchTerm={searchTerm} />
        <MovieRow title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} searchTerm={searchTerm} />
        <MovieRow title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} searchTerm={searchTerm} />
        <MovieRow title="Documentaries" fetchUrl={requests.fetchDocumentaries} searchTerm={searchTerm} />
      </div>
    </div>
  );
}
