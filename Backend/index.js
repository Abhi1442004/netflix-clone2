const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const listRoutes = require('./routes/list');

const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })
);

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/list', listRoutes);

// --- DB + Server ---
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
