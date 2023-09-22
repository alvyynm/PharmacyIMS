const express = require("express");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

const archiveDataController = require("../controllers/archive");

// GET /v1/archiveProducts
router.get(
  "/archiveProducts",
  isAuth,
  archiveDataController.getArchiveProducts
);

module.exports = router;
