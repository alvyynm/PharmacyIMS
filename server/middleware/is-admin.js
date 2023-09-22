const User = require("../models/user");

module.exports = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      // check if user is found
      if (!user) {
        const error = new Error("No user found");
        error.statusCode = 404;
        throw error;
      } else {
        if (user.role === "ADMIN") {
          next();
        } else {
          const error = new Error("Not permitted");
          error.statusCode = 401;
          throw error;
        }
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });

  //   next();
};
