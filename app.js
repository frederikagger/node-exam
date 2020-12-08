const express = require("express");
const app = express();
require("./db/mongoose.js");
const api = require("./api");
const morgan = require("morgan")
const cookieparser = require("cookie-parser");
const cors = require('cors')

app
  .use(cors())
  .use(morgan("dev"))
  .use(cookieparser())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(api)

module.exports = app