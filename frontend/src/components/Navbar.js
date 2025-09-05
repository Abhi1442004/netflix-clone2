import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // On auth pages, show a simple top bar (optional)
  const onAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="navbar">
      <Link to="/" className="navbar__brand">
        <img
          className="navbar__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="Netflix"
        />
      </Link>

      {!onAuthPage && (
        <div className="navbar__search">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm || ""}
            onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <div className="navbar__right">
        {!token ? (
          <>
            <Link className="navbar__link" to="/login">Login</Link>
            <Link className="navbar__link" to="/signup">Sign Up</Link>
          </>
        ) : (
          <button className="navbar__logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
