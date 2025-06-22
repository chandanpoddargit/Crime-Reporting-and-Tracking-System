const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const statsRoutes = require("./routes/statsRoutes");

const app = express();

// DB connection
connectDB();

// Middleware
app.use(errorHandler);
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/stats", statsRoutes);

// Fallback route
app.use((req, res) => {
  res.status(404).json({ message: "API not found" });
});


module.exports = app;
