const jwt = require("jsonwebtoken");
require("dotenv").config;
const jwtSecrectToken = process.env.jwtSecret;

const User = require("../models/User");

const adminAuth = async (req, res, next) => {
  // get the cookie named token
  let cookies = req.cookies;
  const jwtToken = cookies.token;

  try {
    const decoded = jwt.verify(jwtToken, jwtSecrectToken);
    if (decoded.role !== "admin") {
      return res.status(401).json({ message: "You are not allowed to  do this operation", state: "Unauthorized" });
    }
    const user = await User.findOne({
      where: { id: decoded.id, username: decoded.username },
      attributes: ["id", "username"],
    });
    req.user = user;

    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired. Please Login Again", state: "ExpiredToken" });
    } else if (error.name == "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid Token. Please login and Try Again", state: "InvalidToken" });
    } else {
      console.log('Error @ middleware: authenticate.js"', error);
    }
  }
};

module.exports = { adminAuth };
