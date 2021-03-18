const express = require("express")
const q2m = require("query-to-mongo")
const multer = require("multer")
const { authenticate, refreshToken, cryptPassword } = require("../../auth/tools")
const { authorize } = require("../../auth/middleware")
const passport = require("passport")

const UserModel = require("./schema")
const usersRouter = express.Router()

usersRouter.post("/register",  async (req, res, next) => {
	try {
	 const password =  await cryptPassword(req.body.password)
	 req.body["password"] = password
        const newUser = new UserModel(req.body)
		const {_id} = newUser.save()
		res.send(newUser._id)
		console.log("-----Registered user------")
	} catch (error) {
		next(error)
	}
})
usersRouter.get("/me", authorize, async (req, res, next) => {
	try {
		const profile = await UserModel.findOne(req.user._id)
		console.log("got this as profile", profile)
		res.send(profile)
	} catch (error) {
		next(error)
	}
})

usersRouter.post("/login",  async (req, res, next) => {
	try {
        const {email,password} = req.body
		const user = await UserModel.findByCredentials(email,password, {new:true})
		const tokens = await authenticate(user)
		res.send(tokens)
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
