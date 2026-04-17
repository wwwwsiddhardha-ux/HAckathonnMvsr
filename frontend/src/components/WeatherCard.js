import React from "react";

export default function WeatherCard({ weather }) {
  // handle both field name variants
  const temp = weather.temperature ?? weather.temp ?? "--";
  const condition = weather.condition ?? weather.description ?? "--";

  return (
    <div style={s.card}>
      <h3 style={s.title}>🌤 Current Weather</h3>
      <div style={s.grid}>
        <div style={s.item}>
          <span style={s.icon}>🌡</span>
          <div>
            <p style={s.val}>{temp}°C</p>
            <p style={s.lbl}>Temperature</p>
          </div>
        </div>
        <div style={s.item}>
          <span style={s.icon}>💧</span>
          <div>
            <p style={s.val}>{weather.humidity}%</p>
            <p style={s.lbl}>Humidity</p>
          </div>
        </div>
        <div style={s.item}>
          <span style={s.icon}>🌧</span>
          <div>
            <p style={s.val}>{weather.rain ?? 0} mm</p>
            <p style={s.lbl}>Rainfall</p>
          </div>
        </div>
      </div>
      <p style={s.desc}>{condition}</p>
    </div>
  );
}

const s = {
  card: { background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" },
  title: { margin: "0 0 16px 0", color: "#2d6a4f", fontSize: 18 },
  grid: { display: "flex", gap: 16, marginBottom: 12 },
  item: { flex: 1, display: "flex", alignItems: "center", gap: 10 },
  icon: { fontSize: 28 },
  val: { margin: 0, fontSize: 20, fontWeight: 700, color: "#222" },
  lbl: { margin: 0, fontSize: 11, color: "#888", textTransform: "uppercase" },
  desc: { margin: "12px 0 0 0", fontSize: 13, color: "#666", fontStyle: "italic", textAlign: "center" },
};
