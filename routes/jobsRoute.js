const express = require("express");
const userAuth = require("../middlewares/authMiddleware");
const {
  createJob,
  getJobs,
  updateJobs,
  deleteJob,
} = require("../controllers/jobsController");
const router = express.Router();

// create job
router.post("/create-job", userAuth, createJob);
// get jobs
router.get("/get-job", userAuth, getJobs);
// update jobs
router.patch("/update-job/:id", userAuth, updateJobs);
// delete jobs
router.delete("/delete-job/:id", userAuth, deleteJob);
module.exports = router;
