const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/user");

router.get("/user", auth, async (req, res) => {
  return res.send(req.user);
});

//todo: fix patch route to also handle password changes
router.patch("/user", auth, async (req, res, next) => {
  const updates = Object.keys(req.body.user);
  try {    
    updates.forEach((update) => req.user[update] = req.body.user[update]);
    console.log(req.user);
    await req.user.save();
    return res.send(req.user);
  } catch (error) {
    next(error);
  }
});

router.delete("/user", auth, async (req, res, next) => {
  try {
    await req.user.remove();
    console.log("User deleted");
    return res.status(200).send();
  } catch (error) {
    next(error);
  }
});
module.exports = router;
