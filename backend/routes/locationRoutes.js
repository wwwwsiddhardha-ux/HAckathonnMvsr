const express = require("express");
const router = express.Router();
const { getStates, getDistricts, getMandals, getCrops } = require("../controllers/locationController");

router.get("/states",    getStates);
router.get("/districts", getDistricts);
router.get("/mandals",   getMandals);
router.get("/crops",     getCrops);

module.exports = router;
