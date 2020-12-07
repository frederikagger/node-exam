const sharp = require("sharp");

const resizeImage = async (req, res, next) => {
  try {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 150, height: 150 })
      .jpeg({ quality: 70 })
      .toBuffer();
    req.image = buffer; // attaching the resizedimage buffer to the request
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = resizeImage;
