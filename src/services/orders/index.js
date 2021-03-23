const express = require("express")
const q2m = require("query-to-mongo")
const multer = require("multer")
const { authenticate, refreshToken, cryptPassword } = require("../../auth/tools")
const { authorize } = require("../../auth/middleware")
const passport = require("passport")

const OrderModel = require("./schema")
const ordersRouter = express.Router()

ordersRouter.post("/addOrder",  async (req, res, next) => {
	try {
        const newOrder = new OrderModel(req.body)
		const {_id} = newOrder.save()
		res.send(newOrder._id)
		console.log("-----Order sent------")
	} catch (error) {
		next(error)
	}
})

module.exports = ordersRouter
