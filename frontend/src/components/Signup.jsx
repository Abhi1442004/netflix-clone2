import { useState } from "react";
import { signupUser } from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signupUser({ username, email, password });
    if (res?.message === "User created successfully") {
      alert("Signup successful! Login now.");
      navigate("/login");
    } else {
      alert(res?.message || "Signup failed!");
    }
  };

  return (
    <div className="auth-container">
      {/* top-right corner link */}
      <div className="auth-top-right">
        <Link to="/login">Login</Link>
      </div>

      <div className="auth-box">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
