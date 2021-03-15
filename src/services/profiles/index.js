const express = require("express")
const q2m = require("query-to-mongo")
const multer = require("multer")

const { authenticate, refreshToken } = require("../../auth/tools")
const { authorize } = require("../../auth/middleware")
const passport = require("passport")

const UserModel = require("./schema")
const usersRouter = express.Router()

usersRouter.post("/register",  async (req, res, next) => {
	try {
        const newUser = new UserModel(req.body)
		const {_id} = newUser.save()
		res.send(newUser._id)
		console.log("-----Registered user------")
	} catch (error) {
		next(error)
	}
})
usersRouter.get("/:id",  async (req, res, next) => {
	try {
        const user = UserModel.findById(req.body)
		res.send(user)
	} catch (error) {
		next(error)
	}
})
usersRouter.post("/login",  async (req, res, next) => {
	try {
        const user = UserModel.findById(req.body)
		res.send(user)
	} catch (error) {
		next(error)
	}
})
usersRouter.put("/edit/:id",  async (req, res, next) => {
	try {
        const user = UserModel.findByIdAndUpdate(x => x._id === req.id, ...req.body)
		
		res.send(_id)
	} catch (error) {
		next(error)
	}
})
module.exports = usersRouter
