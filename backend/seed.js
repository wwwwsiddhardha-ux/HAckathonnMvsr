require("dotenv").config();
const pool = require("./config/db");
const data = require("./data/mandi_prices.json");

async function seed() {
  console.log(`Seeding ${data.length} records...`);
  for (const r of data) {
    await pool.execute(
      `INSERT IGNORE INTO mandi_prices (crop, state, district, mandal, price, date)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE price = VALUES(price)`,
      [r.crop, r.state, r.district, r.mandal, r.price, r.date]
    ).catch(() =>
      pool.execute(
        "INSERT INTO mandi_prices (crop, state, district, mandal, price, date) VALUES (?, ?, ?, ?, ?, ?)",
        [r.crop, r.state, r.district, r.mandal, r.price, r.date]
      )
    );
  }
  console.log("✅ Seed complete");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
