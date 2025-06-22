const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  type: { type: String, required: true },
  location: { type: String, required: true },
  datetime: { type: Date, required: true },
  description: { type: String },
  evidence: [String], // URLs from Cloudinary
  status: { type: String, enum: ["Pending", "Under Review", "Resolved"], default: "Pending" },
  isAnonymous: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);
