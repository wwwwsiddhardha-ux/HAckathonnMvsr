const { getMandiData } = require("./mandiService");
const {
  movingAverage,
  getTrend,
  applyWeatherImpact,
  generateAlerts,
  getSmartSuggestion,
} = require("../utils/trendCalculator");

function predictPrices(crop, state, district, mandal, weather) {
  const records = getMandiData(crop, district, mandal);
  if (records.length === 0) return null;

  const historical = records.slice(-7);
  const prices = historical.map((d) => d.price);

  const avgPrice = movingAverage(prices);
  const trend = getTrend(prices);

  const driftMap = { increasing: 1.006, decreasing: 0.994, stable: 1.0 };
  const drift = driftMap[trend];

  const predictedPrices = [];
  let base = avgPrice;
  for (let i = 1; i <= 5; i++) {
    base = Math.round(base * drift);
    const weatherAdjusted = applyWeatherImpact(base, weather);
    const date = new Date();
    date.setDate(date.getDate() + i);
    predictedPrices.push({
      date: date.toISOString().split("T")[0],
      price: weatherAdjusted,
    });
  }

  const alerts = generateAlerts(weather, trend, avgPrice, predictedPrices);
  const suggestion = getSmartSuggestion(trend, predictedPrices);

  return {
    historicalPrices: historical.map(({ date, price }) => ({ date, price })),
    predictedPrices,
    weather: {
      temperature: weather.temperature,
      humidity: weather.humidity,
      rain: weather.rain,
      condition: weather.condition,
    },
    trend,
    avgPrice: Math.round(avgPrice),
    alerts,
    suggestion,
  };
}

module.exports = { predictPrices };
