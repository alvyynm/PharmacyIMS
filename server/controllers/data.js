const { validationResult } = require("express-validator");
const Inventory = require("../models/inventory");
const User = require("../models/user");

exports.getProducts = (req, res, next) => {
  Inventory.find()
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

exports.createProduct = (req, res, next) => {
  const errors = validationResult(req);
  //return error is validation failed
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const price = req.body.price;
  const category = req.body.category;
  const quantity = req.body.quantity;
  const shelfNumber = req.body.shelfNumber;
  const expiryDate = req.body.expiryDate;

  // Create product in db
  const product = new Inventory({
    name: name,
    unitPrice: price,
    category: category,
    quantityInStock: quantity,
    shelfNumber: shelfNumber,
    expiryDate: expiryDate,
  });

  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Product created successfully!",
        product: product,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(); // use next because throwing an error using throw error will not reach the next error handling middleware
    });
};

// Update product information

exports.updateProduct = (req, res, next) => {
  const productId = req.params.productId;

  const errors = validationResult(req);
  //return error is validation failed
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const price = req.body.price;
  const category = req.body.category;
  const quantity = req.body.quantity;
  const shelfNumber = req.body.shelfNumber;
  const expiryDate = req.body.expiryDate;

  // update data in db
  Inventory.findById(productId)
    .then((product) => {
      if (!product) {
        const error = new Error("Could not find product.");
        error.statusCode = 422;
        throw error;
      }

      product.name = name;
      product.unitPrice = price;
      product.category = category;
      product.quantityInStock = quantity;
      product.shelfNumber = shelfNumber;
      product.expiryDate = expiryDate;

      //save changes
      return product.save();
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Product info updated successfully", post: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// Delete product from database

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;

  Inventory.findById(productId)
    .then((product) => {
      // check if product is found
      if (!product) {
        const error = new Error("No product found");
        error.statusCode = 404;
        throw error;
      }

      // #TODO: ADD CHECKS TO ENSURE ONLY ADMINS CAN DELETE PRODUCTS
      // check if the user who wants to delete is the one who created the post
      //   if (post.creator.toString() !== req.userId) {
      //     const error = new Error("Not authorized!");
      //     error.statusCode = 403;
      //     throw error;
      //   }

      return Inventory.findByIdAndRemove(productId);
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Product deleted successfully" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
