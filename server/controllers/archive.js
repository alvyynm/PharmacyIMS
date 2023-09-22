const Archive = require("../models/archive");

exports.getArchiveProducts = (req, res, next) => {
  Archive.find()
    .then((products) => {
      res
        .status(200)
        .json({ message: "Fetched products successfully", products: products });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next();
    });
};
