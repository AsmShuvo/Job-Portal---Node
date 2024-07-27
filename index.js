const express = require("express");
const { default: mongoose } = require("mongoose");
const { connectDB } = require("./config/db");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const PORT = process.env.PORT || 3000;
require("dotenv").config();
require("express-async-errors");
const testRoute = require("./routes/testRoutes");
const authRoute = require("./routes/authRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const testMiddleware = require("./middlewares/testMiddleware");

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Job Portal is running");
});
// routes
app.use("/api/v1/auth", authRoute);

// validation middleware : must be after routes
app.use(testMiddleware);
app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(
    `Server is running in ${process.env.DEV_MODE} mode on port ${PORT}`
  );
  await connectDB();
});
