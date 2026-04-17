import React, { useState } from "react";
import axios from "axios";

export default function AuthPage({ onAuth }) {
  const [tab, setTab]     = useState("login");   // "login" | "register"
  const [form, setForm]   = useState({ name: "", email: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const url = tab === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload = tab === "login"
        ? { email: form.email, password: form.password }
        : form;
      const { data } = await axios.post(url, payload);
      if (tab === "register") {
        setTab("login");
        setError("✅ Registered! Please login.");
        setLoading(false);
        return;
      }
      // store token
      localStorage.setItem("fc_token", data.token);
      localStorage.setItem("fc_role",  data.role);
      localStorage.setItem("fc_name",  data.name);
      onAuth(data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* Logo */}
        <div style={s.logo}>🌾 Farmer's Choice</div>
        <p style={s.tagline}>AI Market Intelligence for Farmers</p>

        {/* Tabs */}
        <div style={s.tabs}>
          {["login","register"].map((t) => (
            <button key={t} onClick={() => { setTab(t); setError(""); }}
              style={{ ...s.tab, ...(tab === t ? s.tabActive : {}) }}>
              {t === "login" ? "Login" : "Register"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={s.form}>
          {tab === "register" && (
            <input style={s.input} placeholder="Full Name" value={form.name}
              onChange={(e) => set("name", e.target.value)} required />
          )}
          <input style={s.input} type="email" placeholder="Email" value={form.email}
            onChange={(e) => set("email", e.target.value)} required />
          <input style={s.input} type="password" placeholder="Password" value={form.password}
            onChange={(e) => set("password", e.target.value)} required />

          {tab === "register" && (
            <select style={s.input} value={form.role} onChange={(e) => set("role", e.target.value)}>
              <option value="user">👨‍🌾 Farmer (User)</option>
              <option value="market">🏪 Market Data Provider</option>
            </select>
          )}

          {error && (
            <p style={{ ...s.error, color: error.startsWith("✅") ? "#166534" : "#dc2626",
              background: error.startsWith("✅") ? "#f0fdf4" : "#fef2f2" }}>
              {error}
            </p>
          )}

          <button style={s.btn} type="submit" disabled={loading}>
            {loading ? "⏳ Please wait..." : tab === "login" ? "Login →" : "Create Account →"}
          </button>
        </form>

        <p style={s.skip} onClick={() => onAuth(null)}>
          Continue without login (demo mode)
        </p>
      </div>
    </div>
  );
}

const s = {
  page:      { minHeight: "100vh", background: "linear-gradient(160deg,#f0fdf4,#dcfce7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  card:      { background: "#fff", borderRadius: 20, padding: "40px 36px", width: "100%", maxWidth: 400, boxShadow: "0 8px 40px rgba(0,0,0,0.1)" },
  logo:      { fontSize: 24, fontWeight: 900, color: "#14532d", textAlign: "center", marginBottom: 4 },
  tagline:   { fontSize: 13, color: "#6b7280", textAlign: "center", marginBottom: 24 },
  tabs:      { display: "flex", borderRadius: 10, overflow: "hidden", border: "1.5px solid #d1d5db", marginBottom: 24 },
  tab:       { flex: 1, padding: "10px", border: "none", background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#6b7280" },
  tabActive: { background: "#2d6a4f", color: "#fff" },
  form:      { display: "flex", flexDirection: "column", gap: 12 },
  input:     { padding: "11px 14px", borderRadius: 8, border: "1.5px solid #d1d5db", fontSize: 14, outline: "none" },
  btn:       { padding: "13px", background: "linear-gradient(135deg,#2d6a4f,#40916c)", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 4 },
  error:     { fontSize: 13, padding: "8px 12px", borderRadius: 6, margin: 0 },
  skip:      { textAlign: "center", marginTop: 16, fontSize: 13, color: "#9ca3af", cursor: "pointer", textDecoration: "underline" },
};
