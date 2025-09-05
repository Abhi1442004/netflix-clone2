import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5001";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.href = "/"; // force reload protected app
      } else {
        setMsg("Login failed");
      }
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit} className="auth-form">
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button type="submit">Sign In</button>
        </form>
        {msg && <p className="auth-error">{msg}</p>}
        <p className="auth-alt">
          New to Netflix? <a href="/signup">Sign up now</a>
        </p>
      </div>
    </div>
  );
}
