const express = require("express");
const isAuth = require("../middleware/is-auth");
const isAdmin = require("../middleware/is-admin");
const router = express.Router();

const salesController = require("../controllers/sales");

// GET /v1/sales

router.get("/v1/sales", isAuth, salesController.getSales);

module.exports = router;
