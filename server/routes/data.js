const express = require("express");
const { body, check } = require("express-validator");
const data = require("../models/inventory");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

const dataController = require("../controllers/data");

// GET /v1/products
router.get("/products", isAuth, dataController.getProducts);

// POST /v1/post
router.post(
  "/post",
  isAuth,
  [
    body("name").trim().isLength({ min: 5 }),
    body("price").trim().isLength({ min: 1 }),
    body("category").trim().isLength({ min: 4 }),
    body("quantity").trim().isLength({ min: 1 }),
    body("shelfNumber").trim().isLength({ min: 2 }),
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
    body("name").trim().isLength({ min: 5 }),
    body("price").trim().isLength({ min: 1 }),
    body("category").trim().isLength({ min: 4 }),
    body("quantity").trim().isLength({ min: 1 }),
    body("shelfNumber").trim().isLength({ min: 2 }),
  ],
  dataController.updateProduct
);

//DELETE /v1/product/productId
router.delete("/product/:productId", isAuth, dataController.deleteProduct);

module.exports = router;
