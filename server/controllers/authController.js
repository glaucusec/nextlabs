const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecretToken = process.env.jwtSecret;

const User = require("../models/User");
const { hashPassword, passwordsMatch } = require("../util/helper");

const login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    });
  }

  try {
    const user = await User.findOne({
      where: { username: username },
    });

    const match = await passwordsMatch(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      const maxAge = 3 * 60 * 60;
      const token = jwt.sign(
        { id: user._id, username, role: user.isAdmin ? "admin" : "user" },
        jwtSecretToken,
        {
          expiresIn: maxAge, // 3hrs in sec
        }
      );

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000, // 3hrs in ms
      });

      res.status(200).json({
        message: "Login successful",
        user: { name: user.name, username: username },
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

const register = async (req, res, next) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }

  const hashedPassword = await hashPassword(password);

  let user;
  try {
    user = User.create({
      name: name,
      username: username,
      password: hashedPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "User not successful created",
      error: error.mesage,
    });
  }

  return res.status(200).json({
    message: "User successfully created",
    user: { name: user.name, username: username },
  });
};

const logout = () => {};

module.exports = { login, register, logout };
