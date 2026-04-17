function movingAverage(prices) {
  const window = prices.slice(-7);
  return window.reduce((sum, p) => sum + p, 0) / window.length;
}

function getTrend(prices) {
  const last = prices.slice(-5);
  const diff = last[last.length - 1] - last[0];
  if (diff > last[0] * 0.02) return "increasing";
  if (diff < -(last[0] * 0.02)) return "decreasing";
  return "stable";
}

function applyWeatherImpact(basePrice, weather) {
  let factor = 1.0;
  if (weather.rain > 10) factor += 0.05;
  else if (weather.rain > 5) factor += 0.03;
  if (weather.temperature > 42) factor -= 0.04;
  else if (weather.temperature > 40) factor -= 0.02;
  if (weather.humidity > 85) factor += 0.02;
  return Math.round(basePrice * factor);
}

function generateAlerts(weather, trend, avgPrice, predictedPrices) {
  const alerts = [];

  if (weather.rain > 15)
    alerts.push("Heavy rain expected – possible crop damage and supply disruption.");
  else if (weather.rain > 8)
    alerts.push("Moderate to heavy rain forecast – monitor crop storage conditions.");

  if (weather.condition && weather.condition.toLowerCase().includes("storm"))
    alerts.push("Storm warning active – avoid transporting crops to mandi today.");

  if (weather.temperature > 42)
    alerts.push("Extreme heat alert – crop quality may deteriorate rapidly.");

  if (weather.humidity > 88)
    alerts.push("Very high humidity – risk of fungal disease. Ensure dry storage.");

  if (trend === "decreasing") {
    const drop = avgPrice - predictedPrices[predictedPrices.length - 1].price;
    if (drop > avgPrice * 0.05)
      alerts.push(`Prices expected to drop significantly (est. ₹${Math.round(drop)}/quintal) – consider early selling.`);
    else
      alerts.push("Prices trending downward – monitor market before selling.");
  }

  return alerts;
}

function getSmartSuggestion(trend, predictedPrices) {
  const maxEntry = predictedPrices.reduce((a, b) => (a.price > b.price ? a : b));
  if (trend === "increasing")
    return `Best time to sell: around ${maxEntry.date} — predicted peak ₹${maxEntry.price}/quintal.`;
  if (trend === "decreasing")
    return "Prices are falling. Consider selling within the next 1–2 days to minimise loss.";
  return "Prices are stable. You can sell anytime in the next 5 days without significant risk.";
}

module.exports = { movingAverage, getTrend, applyWeatherImpact, generateAlerts, getSmartSuggestion };
