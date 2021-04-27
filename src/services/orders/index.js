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
	to: 'lolskinsspothlight@gmail.com', // Change to your recipient
	from: 'evgeni776@abv.bg', // Change to your verified sender
	subject: 'New Order',
	text: 'Shop online at http://localhost:3000',
	html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
ordersRouter.post("/addOrder", authorize,  async (req, res, next) => {
	try {
		let totalPrice = 0
		req.user.productsInTheBasket.map(product => 
			totalPrice += parseFloat(product.productPrice)
		)
        const newOrder = new OrderModel(req.body)
		const {_id} = newOrder.save()
		res.send(newOrder._id)
		console.log("-----Order sent------")
		msg.text = "kur"
		msg.html = `<!doctype html>
		<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
		  <head>
			<title>
			</title>
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<style type="text/css">
			#outlook a{padding: 0;}
			.ReadMsgBody{width: 100%;}
			.ExternalClass{width: 100%;}
			.ExternalClass *{line-height: 100%;}
			body{margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}
			table, td{border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;}
			img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
			p{display: block; margin: 13px 0;}
</style>
<!--[if !mso]><!-->
<style type="text/css">
@media only screen and (max-width:480px) {
					  @-ms-viewport {width: 320px;}
					  @viewport {	width: 320px; }
				}
</style>
<!--<![endif]-->
<!--[if mso]> 
  <xml> 
	  <o:OfficeDocumentSettings> 
		  <o:AllowPNG/> 
		  <o:PixelsPerInch>96</o:PixelsPerInch> 
	  </o:OfficeDocumentSettings> 
  </xml>
  <![endif]-->
<!--[if lte mso 11]> 
  <style type="text/css"> 
	  .outlook-group-fix{width:100% !important;}
  </style>
  <![endif]-->
<style type="text/css">
@media only screen and (min-width:480px) {
.dys-column-per-45 {
	width: 45% !important;
	max-width: 45%;
}
.dys-column-per-5 {
	width: 5% !important;
	max-width: 5%;
}
}
			  #outlook a{padding: 0;}
						  .ReadMsgBody{width: 100%;}
						  .ExternalClass{width: 100%;}
						  .ExternalClass *{line-height: 100%;}
						  body{margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}
						  table, td{border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;}
						  p{display: block; margin: 13px 0;}
			</style>
			<!--[if !mso]><!-->
			<style type="text/css">
			  @media only screen and (max-width:480px) {
									@-ms-viewport {width: 320px;}
									@viewport {	width: 320px; }
							  }
			</style>
			<!--<![endif]-->
			<!--[if mso]> 
				<xml> 
					<o:OfficeDocumentSettings> 
						<o:AllowPNG/> 
						<o:PixelsPerInch>96</o:PixelsPerInch> 
					</o:OfficeDocumentSettings> 
				</xml>
				<![endif]-->
			<!--[if lte mso 11]> 
				<style type="text/css"> 
					.outlook-group-fix{width:100% !important;}
				</style>
				<![endif]-->
			<style type="text/css">
			  @media only screen and (max-width:480px) {
			  
							table.full-width-mobile { width: 100% !important; }
							  td.full-width-mobile { width: auto !important; }
			  
			  }
			  @media only screen and (min-width:480px) {
			  .dys-column-per-100 {
				  width: 100.000000% !important;
				  max-width: 100.000000%;
			  }
			  }
			</style>
		  </head>
		  <body>
		  <div>
		  <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='background:#f7f7f7;background-color:#f7f7f7;width:100%;'>
			<tbody>
			  <tr>
				<td>
				  <div style='margin:0px auto;max-width:600px;'>
					<table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='width:100%;'>
					  <tbody>
						<tr>
						  <td style='direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;'>
							<!--[if mso | IE]>
	<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
	<![endif]-->
							<div class='dys-column-per-100 outlook-group-fix' style='direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;'>
							  <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
								<tr>
								  <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
									<div style='color:#F79521;font-family:Oxygen, Helvetica neue, sans-serif;font-size:32px;font-weight:700;line-height:37px;text-align:center;'>
									  Thank you for your order
									</div>
								  </td>
								</tr>
								<tr>
								  <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
									<div style='color:#777777;font-family:Oxygen, Helvetica neue, sans-serif;font-size:14px;line-height:21px;text-align:center;'>
									  We are looking forward to make business with you
									</div>
								  </td>
								</tr>
							  </table>
							</div>
							<!--[if mso | IE]>
	</td></tr></table>
	<![endif]-->
						  </td>
						</tr>
					  </tbody>
					</table>
				  </div>
				</td>
			  </tr>
			</tbody>
		  </table>
		</div>
		  <div>
      <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='background:#f7f7f7;background-color:#f7f7f7;width:100%;'>
        <tbody>
          <tr>
            <td>
              <div style='margin:0px auto;max-width:600px;'>
                <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='width:100%;'>
                  <tbody>
                    <tr>
                      <td style='direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;'>
                        <!--[if mso | IE]>
<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:270px;">
<![endif]-->
                        <div class='dys-column-per-45 outlook-group-fix' style='direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;'>
                          <table border='0' cellpadding='0' cellspacing='0' role='presentation' width='100%'>
                            <tbody>
                              <tr>
                                <td style='background-color:#ffffff;border:1px solid #e5e5e5;padding:15px;vertical-align:top;'>
                                  <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='' width='100%'>
                                    <tr>
                                      <td align='left' style='font-size:0px;padding:0px ;word-break:break-word;'>
                                        <div style='color:#4d4d4d;font-family:Oxygen, Helvetica neue, sans-serif;font-size:18px;font-weight:700;line-height:25px;text-align:left;'>
                                          Shipping Address
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align='left' style='font-size:0px;padding:0px;word-break:break-word;'>
                                        <div style='color:#777777;font-family:Oxygen, Helvetica neue, sans-serif;font-size:14px;line-height:23px;text-align:left;'>
                                          ${req.user.address}
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]>
</td>
<![endif]-->
                        <!-- empty column to create gap -->
                        <!--[if mso | IE]>
<td style="vertical-align:top;width:30px;">
<![endif]-->
                        <div class='dys-column-per-5 outlook-group-fix' style='direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;'>
                          <table border='0' cellpadding='0' cellspacing='0' role='presentation' width='100%'>
                            <tbody>
                              <tr>
                                <td style='background-color:#FFFFFF;padding:0;vertical-align:top;'>
                                  <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='' width='100%'>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]>
</td><td style="vertical-align:top;width:270px;">
<![endif]-->
                        <div class='dys-column-per-45 outlook-group-fix' style='direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;'>
                          <table border='0' cellpadding='0' cellspacing='0' role='presentation' width='100%'>
                            <tbody>
                              <tr>
                                <td style='background-color:#ffffff;border:1px solid #e5e5e5;padding:15px;vertical-align:top;'>
                                  <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='' width='100%'>
                                    <tr>
                                      <td align='left' style='font-size:0px;padding:0px ;word-break:break-word;'>
                                        <div style='color:#4d4d4d;font-family:Oxygen, Helvetica neue, sans-serif;font-size:18px;font-weight:700;line-height:25px;text-align:left;'>
                                          Date Ordered
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align='left' style='font-size:0px;padding:0px;word-break:break-word;'>
                                        <div style='color:#777777;font-family:Oxygen, Helvetica neue, sans-serif;font-size:14px;line-height:22px;text-align:left;'>
                                            ${req.body.date}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align='left' style='font-size:0px;padding:0px ;word-break:break-word;'>
                                        <div style='color:#4d4d4d;font-family:Oxygen, Helvetica neue, sans-serif;font-size:18px;font-weight:700;line-height:25px;text-align:left;'>
                                          Order
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align='left' style='font-size:0px;padding:0px;word-break:break-word;'>
                                        <div style='color:#777777;font-family:Oxygen, Helvetica neue, sans-serif;font-size:14px;line-height:22px;text-align:left;'>
                                         #${newOrder._id}
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]>
</td></tr></table>
<![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
			<div>
			  <!--[if mso | IE]>
		<table align="center" border="0" cellpadding="0" cellspacing="0" style="background:#f7f7f7;background-color:#f7f7f7 width:1200px;" width="600"><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
		<![endif]-->
			  <div style='background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:600px;'>
				<table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='background:#FFFFFF;background-color:#FFFFFF;width:100%;'>
				  <tbody>
					<tr>
					  <td style='direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;'>
						<!--[if mso | IE]>
		<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
		<![endif]-->
						<div class='dys-column-per-100 outlook-group-fix' style='background:#f7f7f7;background-color:#f7f7f7 direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;'>
						  <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='background:#f7f7f7;background-color:#f7f7f7 vertical-align:top;' width='100%'>
							<tr>
							  <td align='left' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
								<table border='0' cellpadding='0' cellspacing='0' style="background:#f7f7f7;background-color:#f7f7f7 cellpadding:0;cellspacing:0;color:#F79521;font-family:'Oxygen', 'Helvetica Neue', helvetica, sans-serif;font-size:14px;line-height:21px;table-layout:auto;width:100%;" width='100%'>
								  <tr>
									<th style='text-align: left; border-bottom: 1px solid #cccccc; color: #4d4d4d; font-weight: 700; padding-bottom: 5px;' width='50%'>
									  Item
									</th>
									<th style='text-align: right; border-bottom: 1px solid #cccccc; color: #4d4d4d; font-weight: 700; padding-bottom: 5px;' width='15%'>
									  Qty
									</th>
									<th style='text-align: right; border-bottom: 1px solid #cccccc; color: #4d4d4d; font-weight: 700; padding-bottom: 5px; ' width='15%'>
									  Total
									</th>
								  </tr>
								</table>
							  </td>
							</tr>
							<tr>
							  <td align='left' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
								<table border='0' cellpadding='0' cellspacing='0' style='cellpadding:0;cellspacing:0;color:#000000;font-family:Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;' width='100%'>
								 ${req.user.productsInTheBasket.map(product =>  `<tr style="font-size:14px; line-height:19px; font-family: 'Oxygen', 'Helvetica Neue', helvetica, sans-serif; color:#777777">
									<td width='50%'>
									  <table cellpadding='0' cellspacing='0' style="font-size:14px; line-height:19px; font-family: 'Oxygen', 'Helvetica Neue', helvetica, sans-serif;" width='100%'>
										<tbody>
										  <tr>
											<td style='padding-right:5px;' width='35%'>
											  <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='border-collapse:collapse;border-spacing:0px;'>
												<tbody>
												  <tr>
													<td style='width:110px;'>
													  <a href='#' target='_blank'>
														<img alt='item1' height='auto' src='${product.image}' style='border: 1px solid #e6e6e6;border-radius:4px;display:block;font-size:13px;height:auto;outline:none;text-decoration:none;width:100%;' width='110' />
													  </a>
													</td>
												  </tr>
												</tbody>
											  </table>
											</td>
											<td style="text-align:left; font-size:14px; line-height:19px; font-family: ' oxygen', 'helvetica neue', helvetica, sans-serif; color: #777777;">
											  <span style='color: #4d4d4d; font-weight:bold;'>
												${product.productName}
											  </span>
											  <br />
											</td>
										  </tr>
										</tbody>
									  </table>
									</td>
									<td style='text-align:center; ' width='10%'>
									  1
									</td>
									<td style='text-align:right; ' width='10%'>
									 ${product.productPrice} BGN
									</td>
								  </tr>`)}
								  
								</table>
							  </td>
							</tr>
							<tr>
							  <td align='left' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
								<table border='0' cellpadding='0' cellspacing='0' style='cellpadding:0;cellspacing:0;color:#000000;font-family:Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;' width='100%'>
								  <tr style="font-size:14px; line-height:19px; font-family: 'Oxygen', 'Helvetica Neue', helvetica, sans-serif; color:#777777">
									<td width='50%'>
									</td>
									<td style='text-align:right; padding-right: 10px; border-top: 1px solid #cccccc;'>
									  <span style='padding:8px 0px; display: inline-block;'>
										Subtotal
									  </span>
									  <br />
									  <span style='padding-bottom:8px; display: inline-block;'>
										Tax
									  </span>
									  <br />
									  <span style='padding-bottom:8px; display: inline-block;'>
										Shipping
									  </span>
									  <br />
									  <span style='display: inline-block;font-weight: bold; color: #4d4d4d'>
										Total
									  </span>
									</td>
									<td style='text-align: right; border-top: 1px solid #cccccc;'>
									  <span style='padding:8px 0px; display: inline-block;'>
									  ${(totalPrice).toFixed(2)} BGN
									  </span>
									  <br />
									  <span style='padding-bottom:8px; display: inline-block;'>
										0.00 BGN
									  </span>
									  <br />
									  <span style='padding-bottom:8px; display: inline-block;'>
									10.00 BGN
									  </span>
									  <br />
									  <span style='display: inline-block;font-weight: bold; color: #4d4d4d'>
									  ${(totalPrice + 10).toFixed(2)} BGN
									  </span>
									</td>
								  </tr>
								</table>
							  </td>
							</tr>
						  </table>
						</div>
						
						<!--[if mso | IE]>
		</td></tr></table>
		<![endif]-->
					  </td>
					</tr>
				  </tbody>
				</table>
			  </div>
			  <!--[if mso | IE]>
		</td></tr></table>
		<![endif]-->
			</div>
			<div>
      <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='background:#f7f7f7;background-color:#f7f7f7;width:100%;'>
        <tbody>
          <tr>
            <td>
              <div style='margin:0px auto;max-width:600px;'>
                <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='width:100%;'>
                  <tbody>
                    <tr>
                      <td style='direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;'>
                        <!--[if mso | IE]>
<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
<![endif]-->
                        <div class='dys-column-per-100 outlook-group-fix' style='direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;'>
                          <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
                            <tr>
                              <td align='center' style='font-size:0px;padding:5px 25px;word-break:break-word;'>
                                <div style='color:#777777;font-family:Oxygen, Helvetica neue, sans-serif;font-size:14px;font-style:bold;font-weight:700;line-height:21px;text-align:center;'>
                                  L.O.G.O.
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align='center' style='font-size:0px;padding:5px 25px;word-break:break-word;'>
                                <div style='color:#777777;font-family:Oxygen, Helvetica neue, sans-serif;font-size:14px;font-style:bold;line-height:1;text-align:center;'>
                                  ул. „Цар Симеон“ 143,
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align='center' style='font-size:0px;padding:5px 25px;word-break:break-word;'>
                                <div style='color:#777777;font-family:Oxygen, Helvetica neue, sans-serif;font-size:14px;font-style:bold;line-height:1;text-align:center;'>
                                  1303 Център, София
                                </div>
                              </td>
                            </tr>
                          </table>
                        </div>
                        <!--[if mso | IE]>
</td></tr></table>
<![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
		  </body>
		</html>`
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
