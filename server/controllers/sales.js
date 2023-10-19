const Sales = require("../models/sales");

exports.getSales = (req, res, next) => {
  Sales.find()
    .then((sales) => {
      res
        .status(200)
        .json({ message: "Fetched sales data successfully", sales: sales });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next();
    });
};
