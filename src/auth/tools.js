const jwt = require("jsonwebtoken");
const User = require("../services/profiles/schema");
const mongoose = require("mongoose");
const saltRounds = 10;
const bcrypt = require("bcryptjs");
const authenticate = async (user) => {
  try {
    console.log("authenticate =>", user);
    const newAccessToken = await generateJWT({ _id: user._id });
    const newRefreshToken = await generateRefreshJWT({ _id: user._id });
    const user2 = await User.findByIdAndUpdate(
      mongoose.Types.ObjectId(user._id),
      {
        $addToSet: {
          tokens: { token: newAccessToken, refreshToken: newRefreshToken },
        },
      },
      { new: true }
    );
    console.log("user2->", user);

    if(user2){
      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }else{
      console.log("Wrong Credentials")
      return "Wrong Credentials"
    }

  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
const cryptPassword = async (plainPW) => {
  try {
    // , function (err, hash) {
    //   console.log("hash ->",hash)
    //   return hash;
    // }
    return await bcrypt.hash(plainPW, saltRounds);
  } catch (e) {
    console.log(e);
    next(e);
  }
};
const generateJWT = (payload) =>
  new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1 week" },
      (err, token) => {
        if (err) rej(err);
        res(token);
      }
    )
  );

verifyJWT = (token) => {
  console.log("token to verify ", token);
  console.log("secret ->", process.env.JWT_SECRET);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("decoded");
  return decoded;
};

const generateRefreshJWT = (payload) =>
  new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.REFRESH_JWT_SECRET,
      { expiresIn: "1 week" },
      (err, token) => {
        if (err) rej(err);
        res(token);
      }
    )
  );

const verifyRefreshToken = (token) =>
  new Promise((res, rej) =>
    jwt.verify(token, process.env.REFRESH_JWT_SECRET, (err, decoded) => {
      if (err) rej(err);
      res(decoded);
    })
  );

const refreshToken = async (oldRefreshToken) => {
  const decoded = await verifyRefreshToken(oldRefreshToken);
  const user = await User.findOne({ _id: decoded._id });
  if (!user) {
    throw new Error(`Access is forbidden`);
  }

  const currentRefreshToken = user.refreshTokens.find(
    (t) => t.refreshToken === oldRefreshToken
  );
  if (!currentRefreshToken) {
    throw new Error(`Refresh token is wrong`);
  }
  const newAccessToken = await generateJWT({ _id: user._id });
  const newRefreshToken = await generateRefreshJWT({ _id: user._id });

  const newRefreshTokens = user.refreshTokens
    .filter((t) => t.refreshToken !== oldRefreshToken)
    .concat({ refreshToken: newRefreshToken });
  user.refreshTokens = [...newRefreshTokens];
  await user.save();
  return { token: newAccessToken, refreshToken: newRefreshToken };
};

module.exports = { authenticate, verifyJWT, refreshToken, cryptPassword };
