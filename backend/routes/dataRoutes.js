const express = require("express");
const router = express.Router();
const { weather, marketData, alerts } = require("../controllers/dataController");

router.get("/weather",     weather);
router.get("/market-data", marketData);
router.get("/alerts",      alerts);

module.exports = router;
