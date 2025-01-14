const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const User = require("../models/user");
const authController = require("../controllers/auth");

// PUT /auth/signup
router.put(
  "/signup",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email address already exists!");
          }
        });
      })
      .normalizeEmail(),
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

// POST /auth/logout
router.post("/logout", authController.logout);

// POST /auth/requestResetPassword
router.post(
  "/requestResetPassword",
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
  authController.resetPasswordRequestController
);

// POST /auth/resetPassword
router.post(
  "/resetPassword",
  [
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
    body("resetToken").trim().not().isEmpty(),
    body("userId").trim().not().isEmpty(),
  ],
  authController.resetPasswordController
);

module.exports = router;
