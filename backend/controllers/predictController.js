const { getWeather } = require("../services/weatherService");
const { predictPrices } = require("../services/predictionService");

async function predict(req, res) {
  const { crop, state, district, mandal } = req.body;

  if (!crop || !state || !district || !mandal) {
    return res.status(400).json({
      error: "All fields are required: crop, state, district, mandal",
    });
  }

  const weather = await getWeather(district);
  const result = predictPrices(crop, state, district, mandal, weather);

  if (!result) {
    return res.status(404).json({
      error: `No mandi data found for crop "${crop}" in ${district} / ${mandal}. Check dataset.`,
    });
  }

  res.json(result);
}

module.exports = { predict };
