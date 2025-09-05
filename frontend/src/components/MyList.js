import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./MovieRow.css";

export default function MyList() {
  const [list, setList] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function load() {
      if (!userId) return;
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:5001"}/api/mylist/${userId}`);
      setList(res.data || []);
    }
    load();
  }, [userId]);

  const remove = async (movieId) => {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:5001"}/api/mylist/remove`, { userId, movieId });
    setList(prev => prev.filter(m => m.id !== movieId));
  };

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: 80 }}>
        <h2 style={{ marginLeft: 20 }}>My List</h2>
        <div className="row__posters" style={{ paddingLeft: 20 }}>
          {list.length ? list.map(m => (
            <div key={m.id} style={{ position: "relative" }}>
              <img className="row__poster" src={`https://image.tmdb.org/t/p/original${m.poster_path}`} alt={m.title} />
              <button onClick={() => remove(m.id)} style={{ position: "absolute", top: 6, right: 6, background: "#e50914", color: "#fff", border: "none", padding: "6px", borderRadius: 4, cursor: "pointer" }}>Remove</button>
            </div>
          )) : <p style={{ color: "#aaa", marginLeft: 20 }}>Your list is empty.</p>}
        </div>
      </div>
    </div>
  );
}
