const express = require("express")
const q2m = require("query-to-mongo")
const multer = require("multer")
const { authenticate, refreshToken, cryptPassword } = require("../../auth/tools")
const { authorize } = require("../../auth/middleware")
const passport = require("passport")

const CategoryModel = require("./schema")
const categoriesRouter = express.Router()

categoriesRouter.post("/addCategory",  async (req, res, next) => {
	try {
        const newCategory = new CategoryModel(req.body)
		const {_id} = newCategory.save()
		res.send(newCategory._id)
		console.log("-----Category added------")
	} catch (error) {
		next(error)
	}
})

module.exports = categoriesRouter
