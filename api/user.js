const router = require("express").Router();
const auth = require("../middleware/auth");
const resizeImage = require("../middleware/resizeImage");
const uploadAWS = require("./../middleware/S3")
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/user", auth, async (req, res) => {
  return res.send(req.user);
});

router.patch("/user", auth, async (req, res, next) => {
  const updates = Object.keys(req.body.user);
  try {
    updates.forEach((update) => (req.user[update] = req.body.user[update]));
    await req.user.save();
    return res.send(req.user);
  } catch (error) {
    next(error);
  }
});

router.delete("/user", auth, async (req, res, next) => {
  try {
    await req.user.remove();
    return res.status(200).send();
  } catch (error) {
    next(error);
  }
});

router.post(
  "/user/profilepic",
  auth,
  upload.single("avatar"),
  resizeImage,
  async (req, res, next) => {
    try {
      const url = await uploadAWS(req.image);
      console.log(url); //todo: save the url to db!
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
