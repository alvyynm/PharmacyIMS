const Users = require("../models/user");

exports.getUsers = (req, res, next) => {
  const loggedUserId = req.params.userId;
  Users.find({ _id: { $ne: loggedUserId } })
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
