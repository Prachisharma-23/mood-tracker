import { useEffect, useState } from "react";
import "./App.css";
import MoodChart from "./components/MoodChart";
import MoodForm from "./components/MoodForm";
import MoodList from "./components/MoodList";
import API from "./services/api";

function App() {
  const [moods, setMoods] = useState([]);

  const fetchMoods = async () => {
    try {
      const res = await API.get("/moods");
      setMoods(res.data);
    } catch (err) {
      console.error("Error fetching moods:", err);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  // ✅ This function refreshes data when a new mood is added
  const handleMoodAdded = () => {
    fetchMoods();
  };

  return (
    <div className="App">
      <div className="main-content">
      <h1>Mood Tracker</h1>
      <MoodForm onMoodAdded={handleMoodAdded} /> {/* Pass function here */}
      <MoodList moods={moods} /> {/* Pass data here */}
      <MoodChart data={moods} /> {/* Pass chart data */}
      </div>
    </div>
  );
}

export default App;

