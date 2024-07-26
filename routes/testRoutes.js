const express = require("express");
const { testPostController } = require("../controllers/testController");
const router = express.Router();

// routes
router.post("/test-post", testPostController);

module.exports = router;
