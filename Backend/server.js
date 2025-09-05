const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth");
// If you have them, keep these lines too:
// const listRoutes = require("./routes/list");
// const movieRoutes = require("./routes/movies");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
// If you have them, keep these:
// app.use("/api/list", listRoutes);
// app.use("/api/movies", movieRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
