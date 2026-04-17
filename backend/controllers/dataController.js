const { getWeather } = require("../services/weatherService");
const pool = require("../config/db");

async function weather(req, res) {
  const { district } = req.query;
  if (!district) return res.status(400).json({ error: "district query param required" });
  const data = await getWeather(district);
  res.json(data);
}

async function marketData(req, res) {
  const { crop, district, mandal } = req.query;
  if (!crop || !district || !mandal)
    return res.status(400).json({ error: "crop, district, mandal required" });
  try {
    const [rows] = await pool.execute(
      "SELECT crop, state, district, mandal, price, date FROM mandi_prices WHERE crop=? AND district=? AND mandal=? ORDER BY date DESC LIMIT 30",
      [crop, district, mandal]
    );
    res.json(rows);
  } catch {
    res.status(500).json({ error: "Failed to fetch market data" });
  }
}

async function alerts(req, res) {
  const { district } = req.query;
  const w = await getWeather(district || "Delhi");
  const result = [];

  const rain = w.rain ?? 0;
  const temp = w.temperature ?? w.temp ?? 30;
  const humidity = w.humidity ?? 60;

  if (rain > 10)
    result.push({ type: "danger", message: "🌧 Heavy rain expected — possible supply disruption. Prices may rise." });
  else if (rain > 5)
    result.push({ type: "warning", message: "🌦 Moderate rain forecast — monitor mandi prices closely." });

  if (temp > 42)
    result.push({ type: "danger", message: "🌡 Extreme heat alert — crop quality risk. Prices may fall." });
  else if (temp > 38)
    result.push({ type: "warning", message: "☀️ High temperature — ensure proper crop storage." });

  if (humidity > 85)
    result.push({ type: "warning", message: "💧 High humidity — risk of fungal disease. Check storage conditions." });

  if (result.length === 0)
    result.push({ type: "info", message: "✅ Weather conditions normal. Market stable." });

  res.json({ alerts: result, weather: w });
}

module.exports = { weather, marketData, alerts };
