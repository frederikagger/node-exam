const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const auth = require("../middleware/auth");

router.patch("/user/:username", auth, async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(password, 8);
    }
    req.user = req.body;
    await User.updateOne(req.user);
    console.log(`User with username ${user.username} was updated`);
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
