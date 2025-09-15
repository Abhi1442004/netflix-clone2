import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({ setSearchTerm }) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [searchInput, setSearchInput] = useState("");

  // hide the search box on auth pages, but keep navbar visible
  const showSearch = !(location.pathname === "/login" || location.pathname === "/signup");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (setSearchTerm) setSearchTerm(searchInput);
    setSearchInput("");
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/" className="navbar__logo">
          Netflix Clone
        </Link>
      </div>

      <div className="navbar__center">
        {showSearch ? (
          <form className="navbar__search" onSubmit={handleSearch}>
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              placeholder="Search..."
            />
            <button type="submit">Search</button>
          </form>
        ) : (
          <div style={{ height: "44px" }} /> /* keeps navbar height consistent */
        )}
      </div>

      <div className="navbar__right">
        {!token ? (
          <>
            <Link to="/login" className="navbar__button">Login</Link>
            <Link to="/signup" className="navbar__button">Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="navbar__button">Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
