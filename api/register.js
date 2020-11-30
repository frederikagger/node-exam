const router = require("express").Router();
const User = require("../models/user");

router.post("/register", async (req, res, next) => {
  try{
    const user = new User(req.body.user);
    await user.save();
    console.log(`User ${user} was created`);
    return res.status(201).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
