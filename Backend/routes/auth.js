const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already used" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    res.status(201).json({
      message: "Registered successfully",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📩 Login request body:", { email, password });

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      console.log("❌ Password mismatch for:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("✅ Login success for:", email);

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
