const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.createJWT = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), exp: Math.floor(Date.now() / 1000) + 60 * 60 }, // one hour
    process.env.secret
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")){
    user.password = await bcrypt.hash(user.password, parseInt(process.env.SALT));
  }
 
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
