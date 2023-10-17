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

// Controller for updating user data by an admin account
exports.updateUser = (req, res, next) => {
  const employeeId = req.params.employeeId;

  //1. retrieve employee details from request
  const name = req.body.name;
  const email = req.body.email;
  const role = req.body.role;
  const status = req.body.status;

  // 2. find employee data in db and update
  Users.findById(employeeId)
    .then((employee) => {
      if (!employee) {
        const error = new Error("Could not find employee.");
        error.statusCode = 422;
        throw error;
      }

      employee.name = name;
      employee.email = email;
      employee.role = role;
      employee.status = status;

      //save changes to db
      return employee.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Employee info updated successfully",
        employee: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
