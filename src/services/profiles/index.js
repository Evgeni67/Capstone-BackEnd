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
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const UserModel = require("./schema");
const usersRouter = express.Router();
var msg = {
  to: 'evgeni313@abv.bg', // Change to your recipient
  from: 'evgeni776@abv.bg', // Change to your verified sender
  subject: 'Welcome to L.O.G.O.',
  text: 'Shop online at http://localhost:3000',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
usersRouter.post("/register", async (req, res, next) => {
  try {
    const password = await cryptPassword(req.body.password);
    req.body["password"] = password;
    const newUser = new UserModel(req.body);
    const { _id } = newUser.save();
    res.send(newUser._id);
    console.log("-----Registered user------");
    msg.to = req.body.email
    sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
  } catch (error) {
    next(error);
  }
});
usersRouter.get("/me", authorize, async (req, res, next) => {
  try {
    const profile = await UserModel.findOne(req.user._id);
    console.log("got this as profile", profile);
    res.send(profile);
  } catch (error) {
    next(error);
  }
});
usersRouter.post("/addToBasket", authorize, async (req, res, next) => {
  try {
    await UserModel.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { productsInTheBasket: req.body } },
      { new: true }
    );
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});
usersRouter.post("/removeFromCart", authorize, async (req, res, next) => {
  console.log("undefined? ->" ,req.body.id)
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      { $pull: { productsInTheBasket: { id: req.body.id } } },
      { new: true }
    );
    res.send(user);
  } catch (error) {
    next(error);
  }
});
usersRouter.post("/removeAllFromCart", authorize, async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
     { productsInTheBasket:[] } ,
      { new: true }
    );
    res.send(user);
  } catch (error) {
    next(error);
  }
});
usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findByCredentials(email, password, {
      new: true,
    });
    const tokens = await authenticate(user);
    res.send(tokens);
  } catch (error) {
    next(error);
  }
});
usersRouter.put("/edit/:id", async (req, res, next) => {
  try {
    const user = UserModel.findByIdAndUpdate(
      (x) => x._id === req.id,
      ...req.body
    );

    res.send(_id);
  } catch (error) {
    next(error);
  }
});
module.exports = usersRouter;
