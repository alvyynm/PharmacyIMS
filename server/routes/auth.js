const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const authController = require("../controllers/auth");

// PUT /auth/signup
router.put(
  "/signup",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Invalid credentials")
      .custom((value, { req }) => {
        User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email address already exists!");
          }
        });
      })
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    body("name").trim().not().isEmpty(),
    body("role").trim().not().isEmpty(),
  ],
  authController.signup
);

// POST /auth/login
router.post(
  "/login",
  [
    body("email")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Enter a valid email")
      .normalizeEmail({ gmail_remove_dots: false }),
  ],
  authController.login
);

module.exports = router;
