import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import "./MoodChart.css";

export default function MoodChart({ data }) {
  // Convert moods into numeric values
  const chartData = data.map((m) => ({
    date: m.date,
    mood: m.mood,
    moodValue:
      m.mood === "Happy"
        ? 5
        : m.mood === "Excited"
        ? 4
        : m.mood === "Tired"
        ? 3
        : m.mood === "Sad"
        ? 2
        : m.mood === "Angry"
        ? 1
        : 0,
  }));

  // Function to convert numeric value → mood label
  const getMoodLabel = (value) => {
    switch (value) {
      case 5: return "Happy";
      case 4: return "Excited";
      case 3: return "Tired";
      case 2: return "Sad";
      case 1: return "Angry";
      default: return "";
    }
  };

  return (
    <div>
      <h3>Mood Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="date" />
          <YAxis
            domain={[0, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tickFormatter={getMoodLabel} // ✅ show text labels instead of numbers
          />
          <Tooltip
            formatter={(value) => getMoodLabel(value)} // ✅ readable tooltip
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Bar dataKey="moodValue" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
