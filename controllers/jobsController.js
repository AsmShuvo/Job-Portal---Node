const jobsModel = require("../models/jobsModel");

const createJob = async (req, res, next) => {
  try {
    const { company, position, status, workType, workLocation } = req.body;
    if (!company || !position) {
      return res.status(400).json({ msg: "Please provide all fields" });
    }
    req.body.createdBy = req.user.userId;
    const job = await jobsModel.create(req.body);
    res.status(201).json({ job });
  } catch (error) {
    next(error);
  }
};

const getJobs = async (req, res, next) => {
  try {
    const jobs = await jobsModel.find({ createdBy: req.user.userId });
    res.status(200).json({
      totalJobs: jobs.length,
      jobs,
    });
  } catch (error) {}
};

module.exports = { createJob, getJobs };
