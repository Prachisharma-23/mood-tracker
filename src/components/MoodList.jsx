import { useState } from "react";
import { filterMoodsByDate } from "../utils/moodDateFilter";
import MoodFilter from "./MoodFilter";
import "./MoodList.css";

export default function MoodList({ moods = [] }) {
  const [filter, setFilter] = useState("7");

  const filteredMoods = filterMoodsByDate(moods, filter);

  return (
    <div className="card">
      <h2>Recent Moods</h2>

      {/* Filter buttons */}
      <MoodFilter filter={filter} setFilter={setFilter} />

      {/* Mood list */}
      {filteredMoods.length === 0 ? (
        <p className="empty">No moods found 🌱</p>
      ) : (
        <ul className="mood-list">
          {filteredMoods.map((mood) => (
            <li key={mood.id} className="mood-item">
              <strong>{mood.mood}</strong>

              {mood.note && <span> — {mood.note}</span>}

              <span className="mood-date">
                {" "}
                ({new Date(mood.timestamp).toDateString()})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
