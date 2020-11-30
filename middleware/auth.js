const jwt = require("jsonwebtoken");
const User = require("../models/user");
const createError = require("http-errors");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new createError("401", "Authentication failed");
    }
    req.user = user; // Sending the user with the request so the next route handlers dont need to fetch the user from db
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
