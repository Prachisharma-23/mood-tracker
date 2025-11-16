import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function MoodChart({ data }) {
  console.log("Chart received data:", data); // 🔍 debugging

  const chartData = data.map((m, index) => {
    const val =
      m.mood === "Happy" ? 5 :
      m.mood === "Excited" ? 4 :
      m.mood === "Tired" ? 3 :
      m.mood === "Sad" ? 2 :
      m.mood === "Angry" ? 1 : 0;

    return {
      id: index + 1,          // 🔥 fallback X-axis key (date may be missing)
      date: m.date || m.createdAt || `Entry ${index+1}`,  
      moodValue: val,
      color:
        m.mood === "Happy" ? "#4CAF50" :
        m.mood === "Excited" ? "#2196F3" :
        m.mood === "Tired" ? "#FFC107" :
        m.mood === "Sad" ? "#9C27B0" :
        m.mood === "Angry" ? "#F44336" : "#999"
    };
  });

  return (
    <div>
      <h3>Mood Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis domain={[0, 5]} />
          <Tooltip />

          <Bar
            dataKey="moodValue"
            fill="#000"  // default color
            isAnimationActive={false}
            shape={(props) => {
              const { x, y, width, height, payload } = props;
              return (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={payload.color}  // 🎨 color always applied
                />
              );
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
