require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes     = require("./routes/authRoutes");
const marketRoutes   = require("./routes/marketRoutes");
const predictRoutes  = require("./routes/predictRoutes");
const dataRoutes     = require("./routes/dataRoutes");
const locationRoutes = require("./routes/locationRoutes");
const { startCron }  = require("./utils/cronJob");

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth",     authRoutes);
app.use("/api/market",   marketRoutes);
app.use("/api/location", locationRoutes);
app.use("/api",          predictRoutes);
app.use("/api",          dataRoutes);

// Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Start cron
startCron();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🌾 Server running on http://localhost:${PORT}`));
