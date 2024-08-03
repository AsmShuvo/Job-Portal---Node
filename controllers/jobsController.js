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

const updateJobs = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;
  // validation
  // if (!company || !position) {
  //   next("Please provide all fields");
  // }
  // find job
  const job = await jobsModel.findOne({ _id: id });
  if (!job) {
    next("No jobs found with this id");
  }
  if (! req.user.userId === job.createdBy.toString()) {
    return next("You don't have permission to update this job");
  }
  const updatedJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ updatedJob });
};

module.exports = { createJob, getJobs, updateJobs };
