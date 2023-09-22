const Users = require("../models/user");

exports.getUsers = (req, res, next) => {
  Users.find()
    .then((users) => {
      res
        .status(200)
        .json({ message: "Fetched users successfully", users: users });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next();
    });
};
