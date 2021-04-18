const express = require("express")
const q2m = require("query-to-mongo")
const multer = require("multer")
const { authenticate, refreshToken, cryptPassword } = require("../../auth/tools")
const { authorize } = require("../../auth/middleware")
const passport = require("passport")
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const OrderModel = require("./schema")
const ordersRouter = express.Router()
var msg = {
	to: 'evgeni313@abv.bg', // Change to your recipient
	from: 'evgeni776@abv.bg', // Change to your verified sender
	subject: 'New Order',
	text: 'Shop online at http://localhost:3000',
	html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
ordersRouter.post("/addOrder", authorize,  async (req, res, next) => {
	try {
        const newOrder = new OrderModel(req.body)
		const {_id} = newOrder.save()
		res.send(newOrder._id)
		console.log("-----Order sent------")
		msg.text = "kur"
		msg.html = `<img src= "https://marketplace.socialbiz.pro/image/data/DP/addons-in-progress/thank-you-page-sample-1.png"/>`
		sgMail
	  .send(msg)
	  .then(() => {
		console.log('-------Email sent---------')
	  })
	  .catch((error) => {
		console.error(error)
	  })
	} catch (error) {
		next(error)
	}
})

module.exports = ordersRouter
