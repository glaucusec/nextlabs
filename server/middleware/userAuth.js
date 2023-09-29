const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecretToken = process.env.jwtSecret;

const adminAuth = (req, res, next) => {
  console.log(req.cookies);
  next();
};

module.exports = { adminAuth };
