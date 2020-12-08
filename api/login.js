const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const createError = require("http-errors");


router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.user.email.toLowerCase()});
    if (!user) {
      throw createError(400, "No user with the current username exist");
    }
    if (await bcrypt.compare(req.body.user.password, user.password)) {
      const token = await user.createJWT();
      res.status(200).send(token);
    } else throw createError(400, "The password is incorrect");
  } catch (error) {
    next(error); // * parsing the error to the error handler
  }
});



module.exports = router;
