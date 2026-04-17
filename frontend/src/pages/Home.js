import React, { useRef } from "react";
import InputForm from "../components/InputForm";

/* ── tiny reusable section wrapper ── */
function Section({ id, bg, children, style }) {
  return (
    <section id={id} style={{ background: bg, padding: "80px 20px", ...style }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

/* ── pill badge ── */
function Badge({ text, color = "#bbf7d0", textColor = "#166534" }) {
  return (
    <span style={{ display: "inline-block", background: color, color: textColor,
      padding: "5px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700,
      letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>
      {text}
    </span>
  );
}

/* ── card ── */
function Card({ icon, title, body, accent = "#2d6a4f" }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: "28px 24px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.07)", borderTop: `4px solid ${accent}`,
      flex: 1, minWidth: 220 }}>
      <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
      <h3 style={{ margin: "0 0 8px", color: "#14532d", fontSize: 17, fontWeight: 700 }}>{title}</h3>
      <p style={{ margin: 0, color: "#4b7c5e", fontSize: 14, lineHeight: 1.7 }}>{body}</p>
    </div>
  );
}

export default function Home({ onResult, user, onLogout }) {
  const formRef = useRef(null);
  const scroll = () => formRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", color: "#1a1a1a" }}>

      {/* ── NAV ── */}
      <nav style={nav.bar}>
        <div style={nav.logo}>🌾 Farmer's Choice</div>
        <div style={nav.links}>
          {["Problem","Solution","USP","Predict"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={nav.link}>{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {user && <span style={{ fontSize: 13, color: "#4b7c5e", fontWeight: 600 }}>👤 {user.name}</span>}
          {onLogout && <button onClick={onLogout} style={{ ...nav.cta, background: "#fee2e2", color: "#dc2626" }}>Logout</button>}
          <button onClick={scroll} style={nav.cta}>Get Prediction →</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={hero.wrap}>
        {/* left */}
        <div style={hero.left}>
          <Badge text="🏆 Hackathon 2024 · Team Alpha Nine" color="#d1fae5" />
          <h1 style={hero.h1}>
            Farmer's Choice<br />
            <span style={{ color: "#22c55e" }}>AI Market Intelligence</span>
          </h1>
          <p style={hero.sub}>
            Helping farmers choose <strong>when to sell</strong> using AI-powered
            crop price predictions, real-time weather data, and smart market alerts.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={scroll} style={hero.btnPrimary}>🔍 Predict Now</button>
            <a href="#problem" style={hero.btnOutline}>Learn More ↓</a>
          </div>
          <div style={hero.stats}>
            {[["5+","Crops"],["10+","Districts"],["Real-time","Weather"],["AI","Predictions"]].map(([v,l]) => (
              <div key={l} style={hero.stat}>
                <span style={hero.statVal}>{v}</span>
                <span style={hero.statLbl}>{l}</span>
              </div>
            ))}
          </div>
        </div>
        {/* right visual */}
        <div style={hero.right}>
          <div style={hero.imgWrap}>
            <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80"
              alt="farm" style={hero.img} />
            <div style={hero.imgOverlay} />
            <div style={hero.floatCard}>
              <span style={{ fontSize: 22 }}>📈</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#14532d" }}>Price Rising</div>
                <div style={{ fontSize: 12, color: "#4b7c5e" }}>Wheat · Ludhiana</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <Section id="problem" bg="linear-gradient(135deg,#f0fdf4,#ecfdf5)">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Badge text="The Problem" color="#fee2e2" textColor="#991b1b" />
          <h2 style={sh.h2}>Farmers Sell at the Wrong Time</h2>
          <p style={sh.sub}>
            Over <strong>70% of Indian farmers</strong> lack access to real-time market data,
            forcing them to sell at low prices due to information asymmetry.
          </p>
        </div>
        <div style={sh.cards}>
          <Card icon="📉" title="Price Volatility" accent="#ef4444"
            body="Crop prices fluctuate wildly due to weather, supply chain disruptions, and seasonal demand shifts." />
          <Card icon="🌐" title="No Market Access" accent="#f59e0b"
            body="Rural farmers have no reliable way to check mandi prices across districts before deciding to sell." />
          <Card icon="🌧" title="Weather Uncertainty" accent="#3b82f6"
            body="Unexpected rainfall or heat waves drastically impact crop quality and market prices overnight." />
          <Card icon="💸" title="Middlemen Losses" accent="#8b5cf6"
            body="Without price intelligence, farmers are forced to accept whatever price middlemen offer at the mandi." />
        </div>
      </Section>

      {/* ── SOLUTION ── */}
      <Section id="solution" bg="linear-gradient(160deg,#0b3d2e 0%,#1a5c40 100%)">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Badge text="Our Solution" color="#d1fae5" textColor="#065f46" />
          <h2 style={{ ...sh.h2, color: "#fff" }}>AI-Powered Price Intelligence</h2>
          <p style={{ ...sh.sub, color: "rgba(255,255,255,0.7)" }}>
            We combine historical mandi data, real-time weather, and AI prediction
            to tell farmers the <strong style={{ color: "#22c55e" }}>best time to sell</strong>.
          </p>
        </div>
        <div style={sh.cards}>
          {[
            { icon: "🧠", title: "AI Prediction Engine", body: "Moving average + weather-adjusted price forecasting for next 5 days.", accent: "#22c55e" },
            { icon: "🌤", title: "Live Weather Data", body: "OpenWeatherMap integration adjusts predictions based on rain, heat & humidity.", accent: "#38bdf8" },
            { icon: "📊", title: "Trend Analysis", body: "Visual price trend charts showing historical vs predicted prices clearly.", accent: "#a78bfa" },
            { icon: "🔔", title: "Smart Alerts", body: "Instant alerts for heavy rain, extreme heat, and significant price movements.", accent: "#fb923c" },
          ].map(c => (
            <div key={c.title} style={{ ...solCard, borderTop: `4px solid ${c.accent}` }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{c.icon}</div>
              <h3 style={{ margin: "0 0 8px", color: "#fff", fontSize: 16, fontWeight: 700 }}>{c.title}</h3>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.7 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── USP ── */}
      <Section id="usp" bg="#f8fafc">
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <Badge text="Why Us" />
            <h2 style={sh.h2}>What Makes Us Different</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 24 }}>
              {[
                ["✅", "100% Free for Farmers", "No subscription, no hidden fees — built for rural India."],
                ["⚡", "Real-Time Data", "Weather + mandi prices updated daily via live APIs."],
                ["🎯", "Hyper-Local", "Predictions at mandal level — not just state or district."],
                ["🤖", "AI + Rule-Based", "Combines ML moving averages with weather impact rules."],
              ].map(([icon, title, body]) => (
                <div key={title} style={usp.row}>
                  <span style={usp.icon}>{icon}</span>
                  <div>
                    <div style={usp.title}>{title}</div>
                    <div style={usp.body}>{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
            <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80"
              alt="farmer" style={{ width: "100%", borderRadius: 20, boxShadow: "0 16px 48px rgba(0,0,0,0.15)" }} />
          </div>
        </div>
      </Section>

      {/* ── PREDICT FORM ── */}
      <Section id="predict" bg="linear-gradient(160deg,#f0fdf4,#ecfdf5)" style={{ paddingBottom: 100 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Badge text="Get Your Prediction" />
          <h2 style={sh.h2}>Check Crop Price Now</h2>
          <p style={sh.sub}>Select your crop and location to get AI-powered price predictions instantly.</p>
        </div>
        <div ref={formRef} style={formWrap}>
          <div style={formInner}>
            <h3 style={{ margin: "0 0 24px", color: "#14532d", fontSize: 20, fontWeight: 700, textAlign: "center" }}>
              🔍 Price Prediction
            </h3>
            <InputForm onResult={onResult} />
          </div>
          {/* side info */}
          <div style={formSide}>
            <h4 style={{ color: "#14532d", margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>
              📋 How It Works
            </h4>
            {[
              ["1️⃣", "Select your crop, state, district & mandal"],
              ["2️⃣", "We fetch last 7 days of mandi prices from our database"],
              ["3️⃣", "Real-time weather data is pulled for your district"],
              ["4️⃣", "AI calculates 5-day price forecast with trend analysis"],
              ["5️⃣", "You get a smart suggestion: sell now or wait"],
            ].map(([n, t]) => (
              <div key={n} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 18 }}>{n}</span>
                <span style={{ fontSize: 13, color: "#4b7c5e", lineHeight: 1.6 }}>{t}</span>
              </div>
            ))}
            <div style={{ marginTop: 20, padding: "14px 16px", background: "#d1fae5",
              borderRadius: 10, borderLeft: "4px solid #22c55e" }}>
              <p style={{ margin: 0, fontSize: 13, color: "#065f46", fontWeight: 600 }}>
                💡 Tip: Predictions are most accurate for crops with 7+ days of historical data.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer style={foot.wrap}>
        <div style={foot.inner}>
          <div style={foot.brand}>
            <span style={{ fontSize: 24 }}>🌾</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>Farmer's Choice</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>AI Market Intelligence</div>
            </div>
          </div>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
            © 2024 · Team Alpha Nine · Hackathon Project
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {["About", "Contact", "GitHub"].map(l => (
              <a key={l} href="#" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── styles ── */
const nav = {
  bar: { position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(12px)", borderBottom: "1px solid #e5e7eb",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "14px 32px", gap: 16 },
  logo: { fontWeight: 800, fontSize: 18, color: "#14532d", whiteSpace: "nowrap" },
  links: { display: "flex", gap: 24 },
  link: { color: "#4b7c5e", fontSize: 14, textDecoration: "none", fontWeight: 500 },
  cta: { padding: "9px 20px", background: "#2d6a4f", color: "#fff", border: "none",
    borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" },
};

const hero = {
  wrap: { display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap",
    background: "linear-gradient(160deg,#f0fdf4 0%,#dcfce7 50%,#f0f9ff 100%)",
    padding: "80px 40px", minHeight: "90vh" },
  left: { flex: 1, minWidth: 300, maxWidth: 560 },
  h1: { fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, color: "#14532d",
    lineHeight: 1.15, margin: "0 0 20px" },
  sub: { fontSize: 17, color: "#4b7c5e", lineHeight: 1.7, margin: "0 0 28px" },
  btnPrimary: { padding: "14px 28px", background: "linear-gradient(135deg,#2d6a4f,#40916c)",
    color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700,
    cursor: "pointer", boxShadow: "0 4px 16px rgba(45,106,79,0.35)" },
  btnOutline: { padding: "14px 28px", background: "transparent", color: "#2d6a4f",
    border: "2px solid #2d6a4f", borderRadius: 10, fontSize: 15, fontWeight: 600,
    cursor: "pointer", textDecoration: "none", display: "inline-block" },
  stats: { display: "flex", gap: 28, marginTop: 36, paddingTop: 28,
    borderTop: "1px solid #bbf7d0", flexWrap: "wrap" },
  stat: { display: "flex", flexDirection: "column" },
  statVal: { fontSize: 22, fontWeight: 900, color: "#2d6a4f" },
  statLbl: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  right: { flex: 1, minWidth: 280 },
  imgWrap: { position: "relative", borderRadius: 24, overflow: "hidden",
    boxShadow: "0 24px 64px rgba(0,0,0,0.15)" },
  img: { width: "100%", height: 420, objectFit: "cover", display: "block" },
  imgOverlay: { position: "absolute", inset: 0,
    background: "linear-gradient(to top, rgba(11,61,46,0.5), transparent)" },
  floatCard: { position: "absolute", bottom: 20, left: 20, background: "#fff",
    borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center",
    gap: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" },
};

const sh = {
  h2: { fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "#14532d",
    margin: "0 0 16px", lineHeight: 1.2 },
  sub: { fontSize: 16, color: "#4b7c5e", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 },
  cards: { display: "flex", gap: 20, flexWrap: "wrap" },
};

const solCard = {
  background: "rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 22px",
  flex: 1, minWidth: 200, backdropFilter: "blur(8px)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const usp = {
  row: { display: "flex", gap: 14, alignItems: "flex-start",
    background: "#fff", borderRadius: 12, padding: "14px 16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  icon: { fontSize: 22, flexShrink: 0 },
  title: { fontWeight: 700, fontSize: 14, color: "#14532d", marginBottom: 2 },
  body: { fontSize: 13, color: "#6b7280", lineHeight: 1.5 },
};

const formWrap = {
  display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start",
};

const formInner = {
  flex: "0 0 auto", width: "100%", maxWidth: 460,
  background: "#fff", borderRadius: 20, padding: "36px 40px",
  boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
};

const formSide = {
  flex: 1, minWidth: 260, background: "#fff", borderRadius: 20,
  padding: "28px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
};

const foot = {
  wrap: { background: "#071f17", padding: "32px 40px" },
  inner: { maxWidth: 1000, margin: "0 auto", display: "flex",
    alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 },
  brand: { display: "flex", alignItems: "center", gap: 10 },
};
