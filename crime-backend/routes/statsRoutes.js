const express = require("express");
const { getCrimeStats } = require("../controllers/statsController");

const router = express.Router();

router.get("/", getCrimeStats);

module.exports = router;
