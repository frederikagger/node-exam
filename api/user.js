const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/user");

router.get("/user", auth, async (req, res) => {
  return res.send(req.user);
});

//todo: fix patch route to also handle password changes
router.patch("/user", auth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findOneAndUpdate({_id}, req.body.user, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });
    if (!user) {
      return res.status(404).send();
    }
    console.log(`User ${user.firstname} was updated`);
    return res.send(user);
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
