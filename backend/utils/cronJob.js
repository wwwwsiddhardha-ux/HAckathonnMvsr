const cron = require("node-cron");
const pool = require("../config/db");

function vary(price) {
  const pct = (Math.random() * 0.04 - 0.02); // ±2%
  return Math.round(price * (1 + pct));
}

async function refreshPrices() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const [existing] = await pool.execute(
      "SELECT COUNT(*) as c FROM mandi_prices WHERE date = ?", [today]
    );
    if (existing[0].c > 0) return; // already refreshed today

    const [latest] = await pool.execute(
      `SELECT crop, state, district, mandal, price
       FROM mandi_prices
       WHERE (crop, district, mandal, date) IN (
         SELECT crop, district, mandal, MAX(date)
         FROM mandi_prices GROUP BY crop, district, mandal
       )`
    );

    for (const row of latest) {
      await pool.execute(
        "INSERT INTO mandi_prices (crop, state, district, mandal, price, date) VALUES (?,?,?,?,?,?)",
        [row.crop, row.state, row.district, row.mandal, vary(row.price), today]
      );
    }
    console.log(`[CRON] Refreshed ${latest.length} price records for ${today}`);
  } catch (e) {
    console.error("[CRON] Error:", e.message);
  }
}

// Run every day at 6:00 AM
function startCron() {
  cron.schedule("0 6 * * *", refreshPrices);
  console.log("⏰ Daily price refresh cron scheduled (6:00 AM)");
}

module.exports = { startCron, refreshPrices };
