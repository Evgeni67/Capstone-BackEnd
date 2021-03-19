const { Schema, model } = require("mongoose");
const CategorySchema = new Schema(
  {
    main_category_name: { type: String },
    categories: [{category_name: { type: String },  products: [] }],
  },
  { timestamps: true }
);

const CategoryModel = model("CategoriesForBathroom", CategorySchema);

module.exports = CategoryModel;
