const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sendEmail = require("../utils/email/sendEmail");

const {
  resetPassword,
  requestPasswordReset,
} = require("../services/passwordreset");

const secret = process.env.MY_SECRET_KEY;

const User = require("../models/user");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid credentials");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const role = req.body.role;

  bcrypt
    .hash(password, 12)
    .then((hashedPwd) => {
      const user = new User({
        email: email,
        password: hashedPwd,
        name: name,
        role: role,
      });

      return user.save();
    })
    .then((result) => {
      // Send welcome email after successful a/c creation
      sendEmail(
        email,
        "Your account has been created successfully",
        {
          name: name,
        },
        "./template/welcome.handlebars"
      );
      res.status(201).json({
        message: "User account created successfully!",
        userId: result._id,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.login = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid credentials");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const password = req.body.password;
  let loggedInUser;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("No account found");
        error.statusCode = 404;
        throw error;
      }

      loggedInUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
      }

      // create jwt token and return it to the user
      const token = jwt.sign(
        {
          email: loggedInUser.email,
          userId: loggedInUser._id.toString(),
        },
        secret,
        {
          expiresIn: "4h",
        }
      );
      res.status(200).json({
        message: "Login successful!",
        token: token,
        userData: {
          userId: loggedInUser._id.toString(),
          email: loggedInUser.email,
          name: loggedInUser.name,
          role: loggedInUser.role,
          password: loggedInUser.password,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  return res
    .status(200)
    .json({ success: true, msg: "User successfully logged out" });
};

exports.resetPasswordRequestController = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid credentials");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const requestPasswordResetService = await requestPasswordReset(
    res,
    req.body.email
  );
  return res.json(requestPasswordResetService);
};

exports.resetPasswordController = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid credentials");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const resetPasswordService = await resetPassword(
    res,
    req.body.userId,
    req.body.resetToken,
    req.body.password
  );
  return res.json(resetPasswordService);
};
