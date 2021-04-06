const express = require("express");
const q2m = require("query-to-mongo");

const { authorize } = require("../../auth/middleware");

const ProductModel = require("./schema");
const productsRouter = express.Router();

productsRouter.post("/addProducts", async (req, res, next) => {
  try {
    for (var i = 0; i < req.body.length; i++) {
      const newProduct = new ProductModel(req.body[i]);
      const { _id } = newProduct.save();
      console.log(newProduct._id);
    }
    console.log("-----Products added------");
    res.send("ok");
  } catch (error) {
    next(error);
  }
});
//Returns a specified category
productsRouter.get("/getCategory/:category", async (req, res, next) => {
  try {
    var category = ""
    if(req.params.category === "SanitarnaKeramika"){
      category = "Санитарна керамика"
    }else if(req.params.category === "Drugi"){
      category = "Други"
    }else if(req.params.category === "Dushove"){
      category = "Душове"
    }else if(req.params.category === "Aksesoari"){
      category = "Аксесоари"
    }else if(req.params.category === "Smesiteli"){
      category = "Смесители"
    }
    const allCategories = await ProductModel.find()
    const categoryToReturn = allCategories.filter(product => product.category === category)
    res.send(categoryToReturn)
    console.log("-----Category sent------");
  } catch (error) {
    next(error);
  }
});
productsRouter.post("/addComment/:id", async (req, res, next) => {
  
  try {
      const product = await ProductModel.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { comments: req.body }},
        { new: true }
      )
    console.log(await ProductModel.findById( req.params.id));
    res.send(product);
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/getComments/:id", async (req, res, next) => {
  try {
      const product = await ProductModel.findById(
        req.params.id
      )
    res.send(product.comments);
  } catch (error) {
    next(error);
  }
});

productsRouter.put("/editComent/:id", async (req, res, next) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
       { text: req.body.text },
      { new: true }
    )
    console.log("-----Comment Edited------");
    res.send("ok");
  } catch (error) {
    next(error);
  }
});
productsRouter.delete("/deleteComment/:id", async (req, res, next) => {
  try {
    const product = await ProductModel.findByIdAndDelete(
      req.params.id,
    )
    console.log("-----Products deleted------");
    res.send("ok");
    console.log("-----Products added------");
    res.send("ok");
  } catch (error) {
    next(error);
  }
});
module.exports = productsRouter;
