const router = require("express").Router();
const User = require("../models/user");
const createError = require("http-errors");

router.post("/register", async (req, res, next) => {
  try{
    const { firstname, lastname, email, password, birthday, country } = req.body.user;
    if (!firstname, !lastname, !email, !birthday, !password, !country){
      throw new createError(400, "Bad request");
    }
    const user = new User(req.body.user);
    user.email = user.email.toLowerCase();
    await user.save();
    return res.status(201).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
