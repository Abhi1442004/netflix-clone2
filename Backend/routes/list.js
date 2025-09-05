const express = require("express");
const jwt = require("jsonwebtoken");
const List = require("../models/List");

const router = express.Router();

// Middleware: check JWT
function authMiddleware(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

// Get user's list
router.get("/", authMiddleware, async (req, res) => {
  try {
    let list = await List.findOne({ userId: req.user.id });
    if (!list) list = await List.create({ userId: req.user.id, movies: [] });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch list", error: err.message });
  }
});

// Add movie to list
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { movie } = req.body;
    let list = await List.findOne({ userId: req.user.id });
    if (!list) list = new List({ userId: req.user.id, movies: [] });

    if (!list.movies.includes(movie)) {
      list.movies.push(movie);
    }

    await list.save();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Failed to add movie", error: err.message });
  }
});

// Remove movie from list
router.post("/remove", authMiddleware, async (req, res) => {
  try {
    const { movie } = req.body;
    let list = await List.findOne({ userId: req.user.id });

    if (list) {
      list.movies = list.movies.filter((m) => m !== movie);
      await list.save();
    }

    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Failed to remove movie", error: err.message });
  }
});

module.exports = router;
