const express = require("express");
const { body, check } = require("express-validator");
const data = require("../models/inventory");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

const dataController = require("../controllers/data");

// GET /v1/products
router.get("/products", isAuth, dataController.getProducts);

// POST /v1/product
router.post(
  "/post",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  dataController.createProduct
);

//GET /v1/post/postId
// router.get("/post/:postId", isAuth, dataController.getPost);

//PUT /v1/product/productId
router.put(
  "/product/:productId",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  dataController.updateProduct
);

//DELETE /v1/product/productId
router.delete("/product/:productId", isAuth, dataController.deleteProduct);

module.exports = router;
