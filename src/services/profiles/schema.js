const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select:false,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        select:false,
      },
  },
  { timestamps: true }
);

ProfileSchema.static(
  "addExperienceToProfile",
  async function (experienceID, profileID) {
    await ProfileModel.findByIdAndUpdate(
      profileID,
      { $push: { experiences: experienceID } },
      { runValidators: true, new: true }
    );
  }
);

const ProfileModel = model("Profiles", ProfileSchema);

module.exports = ProfileModel;
