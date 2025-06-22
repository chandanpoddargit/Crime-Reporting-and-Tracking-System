const Report = require("../models/Report");

exports.getCrimeStats = async (req, res) => {
  const stats = await Report.aggregate([
    { $group: { _id: "$type", count: { $sum: 1 } } }
  ]);
  const formatted = {};
  stats.forEach((s) => (formatted[s._id] = s.count));
  res.json(formatted);
};
