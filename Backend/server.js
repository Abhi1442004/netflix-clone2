import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",                    // local frontend
    "https://netflix-clone2-rho.vercel.app"     // deployed frontend
  ],
  credentials: true
}));

// ✅ Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running ✅" });
});

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error(err));

// ✅ Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
