const router = require("express").Router();
const auth = require("../middleware/auth");

router.patch("/user/:username", auth, async (req, res, next) => {
  try {
    await req.user.save();
    console.log(`User with username ${user.username} was updated`);
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
