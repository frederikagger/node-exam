const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/user");

router.get("/user", auth, async (req, res) => {
  return res.send(req.user);
});

router.get("/users", auth, async (req, res) => {
  users = await User.find({}, "firstname lastname").exec();
  return res.send(users);
});

router.put("/user", auth, async (req, res, next) => {
  try {
    const { user } = req.body;
    console.log(user);
    const { _id } = req.user;
    console.log(_id);
    const updatedUser = await User.findOneAndUpdate({ _id: _id });
    console.log(`User with username ${updatedUser.firstname} was updated`);
    return res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/user", auth, async (req, res, next) => {
  try {
    await req.user.delete();
    console.log("User deleted");
    return res.status(200).send();
  } catch (error) {
    next(error);
  }
});
module.exports = router;
