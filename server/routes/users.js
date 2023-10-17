const express = require("express");
const isAuth = require("../middleware/is-auth");
const isAdmin = require("../middleware/is-admin");
const router = express.Router();

const usersController = require("../controllers/users");

// GET /v1/users
router.get("/users/:userId", isAuth, isAdmin, usersController.getUsers);

// PUT /v1/user/:userId/:employeeId

router.put(
  "/user/:userId/:employeeId",
  isAuth,
  isAdmin,
  usersController.updateUser
);

module.exports = router;
