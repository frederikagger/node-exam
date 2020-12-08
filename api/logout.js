const router = require("express").Router();
const auth = require("../middleware/auth");

router.delete("/logout", auth, async (req, res, next) => {
  const user = req.user;
  user.tokens = [];
  try {
    await user.save();
    return res.status(200).send("User was logged out");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
