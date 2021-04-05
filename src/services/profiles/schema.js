const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const ProfileSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    productsInTheBasket: [],
    phoneNumber: {
      type: String,
      required: true,
      select: false,
    },
    tokens: [
      {
        token: {
          type: String,
        },
        refreshToken: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);
ProfileSchema.removeProductFromCart = async function (_id,heading) {
  const user = await this.findOne({ _id });
  user.productsInTheBasket.filter(x => x.heading !== heading)
  user.save()
  return("removed from cart")
}
ProfileSchema.statics.findByCredentials = async function (email, plainPW) {
  const user = await this.findOne({ email });
  console.log("USER ---------------------->", user);
  if (user) {
    console.log("USER PASSWORD ------------>", user.password, plainPW);
    const isMatch = await bcrypt.compare(plainPW, user.password);
    console.log(isMatch);
    if (isMatch) return user;
    else return null;
  } else {
    return null;
  }
};

const ProfileModel = model("Profiles", ProfileSchema);

module.exports = ProfileModel;
