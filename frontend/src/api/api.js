// src/api/api.js
import axios from "axios";

const BASE_URL = "http://localhost:5001/api/auth"; // Your backend URL

// Signup function
export const signupUser = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/register`, data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

// Login function
export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

// TMDB requests (if still needed)
const API_KEY = "0049509d0b641c69988235d827abb751";
const TMDB_BASE = "https://api.themoviedb.org/3";

export const requests = {
  fetchTrending: `${TMDB_BASE}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRated: `${TMDB_BASE}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${TMDB_BASE}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `${TMDB_BASE}/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `${TMDB_BASE}/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `${TMDB_BASE}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `${TMDB_BASE}/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

// Optional: function to fetch TMDB movies
export const fetchMovies = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (err) {
    console.error("Error fetching movies:", err);
    return [];
  }
};
