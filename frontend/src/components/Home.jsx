// src/components/Home.jsx
import React, { useState, useEffect } from "react";
import { requests, fetchMovies } from "../api/api";
import Row from "./Row"; // Assuming you have Row component
import Banner from "./Banner";

function Home({ searchTerm }) {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [horror, setHorror] = useState([]);
  const [romance, setRomance] = useState([]);
  const [documentaries, setDocumentaries] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      setTrending(await fetchMovies(requests.fetchTrending));
      setTopRated(await fetchMovies(requests.fetchTopRated));
      setAction(await fetchMovies(requests.fetchActionMovies));
      setComedy(await fetchMovies(requests.fetchComedyMovies));
      setHorror(await fetchMovies(requests.fetchHorrorMovies));
      setRomance(await fetchMovies(requests.fetchRomanceMovies));
      setDocumentaries(await fetchMovies(requests.fetchDocumentaries));
    };
    loadMovies();
  }, []);

  // Filter movies based on searchTerm
  const filterMovies = (movies) =>
    searchTerm
      ? movies.filter((movie) =>
          movie.title
            ? movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            : movie.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : movies;

  return (
    <div>
      <Banner />

      <Row title="Trending Now" movies={filterMovies(trending)} />
      <Row title="Top Rated" movies={filterMovies(topRated)} />
      <Row title="Action Movies" movies={filterMovies(action)} />
      <Row title="Comedy Movies" movies={filterMovies(comedy)} />
      <Row title="Horror Movies" movies={filterMovies(horror)} />
      <Row title="Romance Movies" movies={filterMovies(romance)} />
      <Row title="Documentaries" movies={filterMovies(documentaries)} />
    </div>
  );
}

export default Home;
