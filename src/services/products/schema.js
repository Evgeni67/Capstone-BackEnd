const { Schema, model } = require("mongoose");
const ProductSchema = new Schema(
  {
    image: { type: String },
    category: { type: String },
    manifacturedBy: { type: String },
    productName: { type: String },
    category_collection: { type: String },
    productNumber: { type: String },
    productDescription: { type: String },
    productPrice: { type: String },
    rates:[],
    comments:[],
  }
);

const ProductModel = model("Products", ProductSchema);

module.exports = ProductModel;


