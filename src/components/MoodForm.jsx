import { useState } from "react";
import API from "../services/api";
import "./MoodForm.css";

export default function MoodForm({ onMoodAdded }) {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/moods", { mood, note });
    onMoodAdded();  // refresh list
    setMood("");
    setNote("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Mood</h3>
      <select value={mood} onChange={(e) => setMood(e.target.value)} required>
        <option value="">Select mood</option>
        <option value="Happy">😊 Happy</option>
        <option value="Sad">😢 Sad</option>
        <option value="Angry">😡 Angry</option>
        <option value="Tired">😴 Tired</option>
        <option value="Excited">🤩 Excited</option>
      </select>
      <input
        type="text"
        placeholder="Add a note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}
