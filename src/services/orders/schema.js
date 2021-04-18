const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const OrderSchema = new Schema(
  {
    products: {
      type: Array,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        required: true,   
    },date: {
      type: String,
      required: true,   
  }
  },
  { timestamps: true }
);
OrderSchema.finishOrder = async function (_id) {
    try{
        const order = await this.findByIdAndUpdate( _id,
            {  status: "finished"  },
            { new: true });
      }catch(e){
        console.log(e)
    }
}

const OrderModel = model("Orders", OrderSchema);

module.exports = OrderModel;
