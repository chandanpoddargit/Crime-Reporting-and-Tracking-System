const express = require("express");
const multer = require("multer");
const { createReport, getMyReports, getReportById } = require("../controllers/reportController");
const { protect } = require("../middlewares/authMiddleware");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/", protect, upload.array("evidence", 5), createReport);
router.get("/mine", protect, getMyReports);
router.get("/:id", protect, getReportById);

module.exports = router;
