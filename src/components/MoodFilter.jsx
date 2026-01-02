import "./MoodFilter.css";
export default function MoodFilter({ filter, setFilter }) {
  return (
    <div className="mood-filter">
      {[
        { label: "Today", value: "today" },
        { label: "Last 7 Days", value: "7" },
        { label: "Last 30 Days", value: "30" },
        { label: "All", value: "all" },
      ].map((item) => (
        <button
          key={item.value}
          className={filter === item.value ? "active" : ""}
          onClick={() => setFilter(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
