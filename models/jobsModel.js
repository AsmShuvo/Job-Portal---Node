const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name required"],
    },
    position: {
      type: String,
      required: [true, "job Position is required"],
    },
    status: {
      type: String,
      enum: ["pending", "reject", "interview"],
      default: "pending",
      required: [true, "status is required"],
    },
    workType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      default: "full-time",
      required: [true, "job type is required"],
    },
    workLocation: {
      type: String,
      default: "Dhaka",
      required: [true, "locaion is required"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobsSchema);
