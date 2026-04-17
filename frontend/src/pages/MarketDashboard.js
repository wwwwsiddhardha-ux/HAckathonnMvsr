import React, { useState } from "react";
import axios from "axios";

export default function MarketDashboard({ user, onLogout }) {
  const [form, setForm]     = useState({ crop: "", state: "", district: "", mandal: "", price: "", date: new Date().toISOString().split("T")[0] });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]       = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const token = localStorage.getItem("fc_token");
      await axios.post("/api/market/add-price", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg("✅ Price data uploaded successfully!");
      setForm((f) => ({ ...f, price: "" }));
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.error || "Upload failed"));
    } finally {
      setLoading(false);
    }
  };

  const crops = ["Wheat", "Rice", "Tomato", "Onion", "Maize"];

  return (
    <div style={s.page}>
      <div style={s.container}>
        {/* Header */}
        <div style={s.header}>
          <div>
            <h2 style={s.title}>🏪 Market Dashboard</h2>
            <p style={s.sub}>Welcome, {user?.name} · Upload daily mandi prices</p>
          </div>
          <button style={s.logoutBtn} onClick={onLogout}>Logout</button>
        </div>

        {/* Upload Form */}
        <div style={s.card}>
          <h3 style={s.cardTitle}>📤 Upload Price Data</h3>
          <form onSubmit={handleSubmit} style={s.form}>
            <div style={s.row}>
              <div style={s.field}>
                <label style={s.label}>Crop</label>
                <select style={s.input} value={form.crop} onChange={(e) => set("crop", e.target.value)} required>
                  <option value="">Select Crop</option>
                  {crops.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={s.field}>
                <label style={s.label}>State</label>
                <input style={s.input} placeholder="e.g. Punjab" value={form.state} onChange={(e) => set("state", e.target.value)} required />
              </div>
            </div>
            <div style={s.row}>
              <div style={s.field}>
                <label style={s.label}>District</label>
                <input style={s.input} placeholder="e.g. Ludhiana" value={form.district} onChange={(e) => set("district", e.target.value)} required />
              </div>
              <div style={s.field}>
                <label style={s.label}>Mandal</label>
                <input style={s.input} placeholder="e.g. Ludhiana East" value={form.mandal} onChange={(e) => set("mandal", e.target.value)} required />
              </div>
            </div>
            <div style={s.row}>
              <div style={s.field}>
                <label style={s.label}>Price (₹/quintal)</label>
                <input style={s.input} type="number" placeholder="e.g. 2100" value={form.price} onChange={(e) => set("price", e.target.value)} required />
              </div>
              <div style={s.field}>
                <label style={s.label}>Date</label>
                <input style={s.input} type="date" value={form.date} onChange={(e) => set("date", e.target.value)} required />
              </div>
            </div>
            {msg && (
              <p style={{ ...s.msg, color: msg.startsWith("✅") ? "#166534" : "#dc2626",
                background: msg.startsWith("✅") ? "#f0fdf4" : "#fef2f2" }}>{msg}</p>
            )}
            <button style={s.btn} type="submit" disabled={loading}>
              {loading ? "⏳ Uploading..." : "📤 Upload Price Data"}
            </button>
          </form>
        </div>

        {/* Info */}
        <div style={s.infoCard}>
          <h4 style={{ color: "#14532d", margin: "0 0 8px" }}>ℹ️ About Market Role</h4>
          <p style={{ color: "#4b7c5e", fontSize: 14, margin: 0, lineHeight: 1.7 }}>
            As a market data provider, you can upload daily mandi prices for any crop and location.
            This data is used by our AI engine to generate accurate price predictions for farmers.
          </p>
        </div>
      </div>
    </div>
  );
}

const s = {
  page:      { minHeight: "100vh", background: "#f8fafc", padding: "24px 16px" },
  container: { maxWidth: 800, margin: "0 auto" },
  header:    { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 },
  title:     { margin: 0, color: "#14532d", fontSize: 26, fontWeight: 800 },
  sub:       { margin: "4px 0 0", color: "#6b7280", fontSize: 14 },
  logoutBtn: { padding: "9px 18px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 },
  card:      { background: "#fff", borderRadius: 16, padding: "28px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", marginBottom: 20 },
  cardTitle: { margin: "0 0 20px", color: "#14532d", fontSize: 18, fontWeight: 700 },
  form:      { display: "flex", flexDirection: "column", gap: 16 },
  row:       { display: "flex", gap: 16, flexWrap: "wrap" },
  field:     { flex: 1, minWidth: 200, display: "flex", flexDirection: "column", gap: 4 },
  label:     { fontWeight: 600, fontSize: 12, color: "#444", textTransform: "uppercase", letterSpacing: 0.5 },
  input:     { padding: "10px 12px", borderRadius: 8, border: "1.5px solid #d1d5db", fontSize: 14 },
  btn:       { padding: "13px", background: "linear-gradient(135deg,#2d6a4f,#40916c)", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" },
  msg:       { padding: "10px 14px", borderRadius: 8, fontSize: 13, margin: 0 },
  infoCard:  { background: "#f0fdf4", borderRadius: 12, padding: "20px 24px", border: "1px solid #bbf7d0" },
};
