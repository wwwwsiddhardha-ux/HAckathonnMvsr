const pool = require("../config/db");
const locationData = require("../data/locationData.json");

const CROPS = ["Wheat", "Rice", "Tomato", "Onion", "Maize"];

async function getStates(req, res) {
  try {
    const [rows] = await pool.execute("SELECT DISTINCT state FROM mandi_prices ORDER BY state");
    const dbStates = rows.map((r) => r.state);
    const jsonStates = Object.keys(locationData);
    const merged = [...new Set([...dbStates, ...jsonStates])].sort();
    res.json(merged);
  } catch {
    res.json(Object.keys(locationData).sort());
  }
}

async function getDistricts(req, res) {
  const { state } = req.query;
  if (!state) return res.status(400).json({ error: "state required" });
  try {
    const [rows] = await pool.execute(
      "SELECT DISTINCT district FROM mandi_prices WHERE state = ? ORDER BY district",
      [state]
    );
    const dbDistricts = rows.map((r) => r.district);
    const jsonDistricts = locationData[state] ? Object.keys(locationData[state]) : [];
    const merged = [...new Set([...dbDistricts, ...jsonDistricts])].sort();
    res.json(merged);
  } catch {
    res.json(locationData[state] ? Object.keys(locationData[state]).sort() : []);
  }
}

async function getMandals(req, res) {
  const { district } = req.query;
  if (!district) return res.status(400).json({ error: "district required" });
  try {
    const [rows] = await pool.execute(
      "SELECT DISTINCT mandal FROM mandi_prices WHERE district = ? ORDER BY mandal",
      [district]
    );
    const dbMandals = rows.map((r) => r.mandal);
    // find in json
    let jsonMandals = [];
    for (const state of Object.values(locationData)) {
      if (state[district]) { jsonMandals = state[district]; break; }
    }
    const merged = [...new Set([...dbMandals, ...jsonMandals])].sort();
    res.json(merged);
  } catch {
    res.json([]);
  }
}

function getCrops(req, res) {
  res.json(CROPS);
}

module.exports = { getStates, getDistricts, getMandals, getCrops };
