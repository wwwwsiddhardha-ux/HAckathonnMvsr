require("dotenv").config();
const express = require("express");
const cors = require("cors");
const predictRoutes = require("./routes/predictRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(predictRoutes);

app.get("/health", (req, res) => res.json({ status: "ok", service: "AI Farmer Market Intelligence" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌾 Backend running on http://localhost:${PORT}`);
  console.log(`   POST http://localhost:${PORT}/predict-price`);
});
