const express = require("express");
const q2m = require("query-to-mongo");
const multer = require("multer");
const {
  authenticate,
  refreshToken,
  cryptPassword,
} = require("../../auth/tools");
const { authorize } = require("../../auth/middleware");
const passport = require("passport");

const CategoryModel = require("./schema");
const categoriesRouter = express.Router();

categoriesRouter.post("/addCategory", async (req, res, next) => {
  try {
    const newCategory = new CategoryModel(req.body);
    const { _id } = newCategory.save();
    res.send(newCategory._id);
    console.log("-----Category added------");
  } catch (error) {
    next(error);
  }
});
//Returns the whole array for smesiteli products
categoriesRouter.get("/smesiteli", async (req, res, next) => {
  try {
    const allCategories = await CategoryModel.findOne({
      main_category_name: "Смесители",
    });
    res.send(allCategories);
    console.log("-----Categories sent------");
  } catch (error) {
    next(error);
  }
});
//Returns the whole array for zaBanq products
categoriesRouter.get("/zaBanq", async (req, res, next) => {
  try {
    const allCategories = await CategoryModel.findOne({
      main_category_name: "За Баня",
    });
    res.send(allCategories);
    console.log("-----Categories sent------");
  } catch (error) {
    next(error);
  }
});
//Returns single product from the zaBanq products array
categoriesRouter.get("/zaBanq/:category/:heading", async (req, res, next) => {
  try {
    const allCategories = await CategoryModel.findOne({
      main_category_name: "За Баня",
    });
    console.log(req.params.heading);
    const category = allCategories.categories
      .filter((x) => x.category_name === req.params.category)[0]
      .products.filter((x) => x.heading === req.params.heading);
    res.send(category);
    console.log("-----Category sent------");
  } catch (error) {
    next(error);
  }
});
//Returns single product from the smesiteli products array
categoriesRouter.get(
  "/smesiteli/:category/:heading",
  async (req, res, next) => {
    try {
      const allCategories = await CategoryModel.findOne({
        main_category_name: "Смесители",
      });
      console.log(req.params.heading);
      const category = allCategories.categories
        .filter((x) => x.category_name === req.params.category)[0]
        .products.filter((x) => x.heading === req.params.heading);
      res.send(category);
      console.log("-----Category sent------");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = categoriesRouter;
