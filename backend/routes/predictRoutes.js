const express = require("express");
const router = express.Router();
const { predict } = require("../controllers/predictController");

// Public route — no auth required for hackathon demo
router.post("/predict-price", predict);

module.exports = router;
