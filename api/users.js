const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/user");

router.get("/users", auth, async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    users = await User.find({}, "firstname lastname profilePicURL _id country")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    return res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

router.post("/users", async (req, res, next) => {
  try {
    const { users } = req.body;
    console.log(users);
    users.map((user) => new User(user).save());
    return res.status(201).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
