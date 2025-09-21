📄 Final README.md (Ready to Use)
# Netflix Clone 🎬

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://netflix-clone2-rho.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-00aced)](https://netflix-clone2-31y3.onrender.com)
[![License](https://img.shields.io/badge/License-MIT-blue)](./LICENSE)

## 📌 Overview
A Netflix-style streaming UI built with **React** (frontend) and **Node.js + Express + MongoDB** (backend).  
Includes **signup/login (JWT)**, responsive UI, and a **"My List" (favorites)** feature.  

Deployed with **Vercel (frontend)** and **Render (backend)**.  

---

## 🚀 Live Demo
- 🎥 **Frontend (UI):** [https://netflix-clone2-rho.vercel.app](https://netflix-clone2-rho.vercel.app)  
- 🔌 **Backend API:** [https://netflix-clone2-31y3.onrender.com/api](https://netflix-clone2-31y3.onrender.com/api)  

---

## ✨ Features
- ✅ User **Signup & Login** with JWT authentication  
- ✅ **Browse movies** with TMDB integration  
- ✅ Add to **"My List" (favorites)**  
- ✅ Responsive design (mobile + desktop)  
- ✅ **Protected API routes**  

---

## 🛠 Tech Stack
- **Frontend:** React, Axios, CSS/Tailwind  
- **Backend:** Node.js, Express, Mongoose  
- **Database:** MongoDB Atlas  
- **Deployment:** Vercel (frontend), Render (backend)  

---

## 📂 Repo Structure


/ (root)
├── Backend # Backend server (Express, routes, models)
├── frontend # React frontend (UI)
├── README.md
└── LICENSE


---

## ⚡ Getting Started (Run Locally)

### 🔹 Prerequisites
- Node.js v16+  
- npm or yarn  
- MongoDB Atlas account  

### 🔹 Backend Setup
```bash
cd Backend
cp .env.example .env    # create .env file and fill values
npm install
npm run start           # or node server.js


.env example:

PORT=5001
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.rkx1j0v.mongodb.net/netflix-clone?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
CLIENT_ORIGIN=http://localhost:5173

🔹 Frontend Setup
cd frontend
npm install
npm run dev


Configure API base URL (example):

// frontend/src/api.js
import axios from "axios";
export default axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://netflix-clone2-31y3.onrender.com/api",
  withCredentials: true
});

📡 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
GET	/api/list	Get "My List" movies
POST	/api/list	Add movie to "My List"
🌍 Deployment

Frontend (Vercel): https://netflix-clone2-rho.vercel.app

Backend (Render): https://netflix-clone2-31y3.onrender.com

📸 Screenshots

(Add your own screenshots inside /assets folder and update links)
Example:

![Home screen](./assets/screenshot-home.png)

🤝 Contributing

Fork the repo

Create a new branch feature/your-feature

Commit changes with clear messages

Open a Pull Request

📜 License

MIT © 2025 Abhi1442004

📬 Contact

Name: Abhi

GitHub: Abhi1442004

Portfolio: (Add once ready 🚀)
