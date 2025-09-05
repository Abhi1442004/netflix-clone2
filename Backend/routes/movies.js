const express = require("express");
const axios = require("axios");

const router = express.Router();

const TMDB_API_KEY = "YOUR_TMDB_API_KEY"; // 🔑 replace with your TMDB API key

router.get("/trending", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${TMDB_API_KEY}`
    );
    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch trending movies" });
  }
});

router.get("/top-rated", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}`
    );
    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch top rated movies" });
  }
});

module.exports = router;
