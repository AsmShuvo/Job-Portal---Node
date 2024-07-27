const express = require("express");
const { testPostController } = require("../controllers/testController");
const userAuth = require("../middlewares/authMiddleware");
const router = express.Router();

// routes
router.post("/test-post", userAuth, testPostController);

module.exports = router;
