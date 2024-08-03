const express = require("express");
const userAuth = require("../middlewares/authMiddleware");
const { createJob, getJobs } = require("../controllers/jobsController");
const router = express.Router();

// routes
// create job
router.post("/create-job", userAuth, createJob);
// get jobs
router.get("/get-job", userAuth, getJobs);

module.exports = router;
