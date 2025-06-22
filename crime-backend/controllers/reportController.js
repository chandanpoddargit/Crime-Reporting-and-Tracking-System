const Report = require("../models/Report");
const cloudinary = require("../config/cloudinary");

exports.createReport = async (req, res) => {
  const { type, location, datetime, description } = req.body;
  const isAnonymous = !req.user;

  let files = req.files || [];
  const evidence = [];

  for (const file of files) {
    const result = await cloudinary.uploader.upload(file.path, { folder: "evidence" });
    evidence.push(result.secure_url);
  }

  const report = await Report.create({
    user: isAnonymous ? null : req.user._id,
    type,
    location,
    datetime,
    description,
    evidence,
    isAnonymous,
  });

  res.status(201).json(report);
};

exports.getMyReports = async (req, res) => {
  const reports = await Report.find({ user: req.user._id });
  res.json(reports);
};

exports.getReportById = async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) return res.status(404).json({ message: "Report not found" });
  res.json(report);
};
