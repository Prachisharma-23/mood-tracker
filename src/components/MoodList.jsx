import "./MoodList.css";

export default function MoodList({ moods }) {

  const recentMoods = moods.slice(-7);
  return (
    <div>
      <h3>Recent Moods</h3>
      <ul>
        {recentMoods.length === 0 ? (
          <li>No moods recorded yet.</li>
        ) : (
          recentMoods.map((m) => (
            <li key={m.id}>
              <strong>{m.mood}</strong>
              {m.note && ` - ${m.note}`}
              {m.date && ` (${new Date(m.date).toDateString()})`}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
