const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const listRoutes = require('./routes/list');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'https://your-frontend-url.vercel.app', // replace with your frontend URL
  credentials: true,
}));

// Test API route
app.get('/api', (req, res) => {
  res.json({ message: "Backend API is running ✅" });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/list', listRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
