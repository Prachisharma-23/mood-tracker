import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function MoodChart({ data }) {
  // Empty state
  if (!data || data.length === 0) {
    return <p className="empty">📊 Mood trends will appear here.</p>;
  }

  // Convert moods → chart-friendly data
  const chartData = data.map((mood, index) => {
    const moodScoreMap = {
      Happy: 5,
      Excited: 4,
      Tired: 3,
      Sad: 2,
      Angry: 1,
    };

    return {
      id: mood.id ?? index + 1,
      date: mood.timestamp
        ? new Date(mood.timestamp).toLocaleDateString()
        : `Entry ${index + 1}`,
      moodValue: moodScoreMap[mood.mood] ?? 0,
      color:
        mood.mood === "Happy"
          ? "#4CAF50"
          : mood.mood === "Excited"
          ? "#2196F3"
          : mood.mood === "Tired"
          ? "#FFC107"
          : mood.mood === "Sad"
          ? "#9C27B0"
          : mood.mood === "Angry"
          ? "#F44336"
          : "#999",
    };
  });

  return (
    <div className="card">
      <h2>Mood Trends</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis domain={[0, 5]} />
          <Tooltip />

          <Bar
            dataKey="moodValue"
            isAnimationActive={false}
            shape={({ x, y, width, height, payload }) => (
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={payload.color}
                rx={6}
              />
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}