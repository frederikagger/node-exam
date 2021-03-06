const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    validate(value){
      if (!value){
        throw new Error("Name can't be empty")
      }
    }
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    validate(value){
      if (!value){
        throw new Error("Name can't be empty")
      }
    }
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
  profilePicURL: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
}, {
  timestamps: true
});

userSchema.methods.createJWT = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), exp: Math.floor(Date.now() / 1000) + 60 * 60 }, // one hour
    process.env.SECRET
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
