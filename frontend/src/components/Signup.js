import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // reuse same styles

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5001";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await axios.post(`${API_BASE}/api/auth/register`, {
        username,
        email,
        password,
      });
      if (res.status === 201) {
        alert("Signup successful! Please login.");
        window.location.href = "/login";
      } else {
        setMsg(res.data?.message || "Signup failed");
      }
    } catch (err) {
      setMsg(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <button type="submit">Sign Up</button>
        </form>
        {msg && <p className="auth-error">{msg}</p>}
        <p className="auth-alt">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
}
