const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/user");

router.get("/users", auth, async (req, res) => {
  users = await User.find({}, "firstname lastname").exec();
  return res.send(users);
});

module.exports = router;