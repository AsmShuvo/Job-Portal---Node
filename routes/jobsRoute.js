const express = require("express");
const userAuth = require("../middlewares/authMiddleware");
const {
  createJob,
  getJobs,
  updateJobs,
} = require("../controllers/jobsController");
const router = express.Router();

// create job
router.post("/create-job", userAuth, createJob);
// get jobs
router.get("/get-job", userAuth, getJobs);
// update jobs
router.patch("/update-job/:id", userAuth, updateJobs);
module.exports = router;
