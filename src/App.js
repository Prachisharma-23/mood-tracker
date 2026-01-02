import { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import MoodChart from "./components/MoodChart";
import MoodFilter from "./components/MoodFilter";
import MoodForm from "./components/MoodForm";
import MoodList from "./components/MoodList";
import Register from "./components/Register";

import API from "./services/api";
import { filterMoodsByDate } from "./utils/moodDateFilter";

function App() {
  // 🔐 Logged-in user
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  // 📊 All moods from backend
  const [moods, setMoods] = useState([]);

  // 🗓️ Date filter (Today | 7 | 30 | All)
  const [filter, setFilter] = useState("7");

  // ✅ Fetch moods safely
  const fetchMoods = useCallback(async () => {
    if (!user) return;

    try {
      const res = await API.get(`/moods/${user.id}`);
      setMoods(res.data || []);
    } catch (err) {
      console.warn("Could not fetch moods (backend may be down)");
      setMoods([]);
    }
  }, [user]);

  // 🔄 Fetch moods only after login
  useEffect(() => {
    if (user) {
      fetchMoods();
    } else {
      setMoods([]);
    }
  }, [user, fetchMoods]);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // 🧮 Apply date filter ONCE
  const filteredMoods = filterMoodsByDate(moods, filter);

  // 🔒 Dashboard
  const Dashboard = () => (
    <div className="page">
      {/* HEADER */}
      <header className="header">
        <div />

        <div className="header-center">
          <img src="/logoo.png" alt="Logo" className="logo" />
          <h1>Mood Tracker</h1>
        </div>

        <div className="header-right">
          <p>Welcome, {user?.username || user?.email}</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="content">
        {/* ADD MOOD */}
        <div className="card">
          <MoodForm onMoodAdded={fetchMoods} />
        </div>

        {/* DATE FILTER (controls list + chart) */}

        {/* RECENT MOODS */}
        <MoodList moods={filteredMoods} />

         <div className="card">
          <MoodFilter filter={filter} setFilter={setFilter} />
        </div>

        {/* MOOD TRENDS */}
        <div className="card">
          <MoodChart data={filteredMoods} />
        </div>
      </main>
    </div>
  );

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login onLogin={setUser} />} />
      <Route path="/register" element={<Register />} />

      {/* Protected route */}
      <Route
        path="/"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
