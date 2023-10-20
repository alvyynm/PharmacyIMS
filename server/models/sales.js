const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Sale schema and model
const saleSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  saleValue: {
    type: Number,
    required: true,
  },
  saleDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("sale", saleSchema);
