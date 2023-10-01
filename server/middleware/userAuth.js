const jwt = require("jsonwebtoken");
require("dotenv").config;
const jwtSecrectToken = process.env.jwtSecret;

const User = require("../models/User");

const userAuth = async (req, res, next) => {
  let jwtToken;

  try {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
      jwtToken = req.headers.authorization.split(" ")[1];
    }
    if (!jwtToken) {
      const cookies = req.cookies;
      if (cookies.token) {
        jwtToken = cookies.token;
      }
    }

    if (!jwtToken) {
      return res.status(401).json({
        message: "Unauthorized:  Token is missing",
        status: "Unauthorized",
      });
    }

    const decoded = jwt.verify(jwtToken, jwtSecrectToken);
    if (!decoded.role || decoded.role !== "user") {
      return res.status(401).json({
        message: "You are not allowed to  do this operation",
        state: "Unauthorized",
      });
    }
    const user = await User.findOne({
      where: { id: decoded.id, username: decoded.username },
      attributes: ["id", "username", "totalPoints"],
    });
    req.user = user;
    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return res.status(401).json({
        message: "Token Expired. Please Login Again",
        state: "ExpiredToken",
      });
    } else if (error.name == "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid Token. Please login and Try Again",
        state: "InvalidToken",
      });
    } else {
      console.log('Error @ middleware: authenticate.js"', error);
    }
  }
};

module.exports = { userAuth };
