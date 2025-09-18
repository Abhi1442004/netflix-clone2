import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // Using .env for backend URL

// Signup function
export const signupUser = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/register`, data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

// Login function
export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

// TMDB requests
const API_KEY = import.meta.env.VITE_TMDB_KEY;
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

// Fetch TMDB movies
export const fetchMovies = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (err) {
    console.error("Error fetching movies:", err);
    return [];
  }
};
