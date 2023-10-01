const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecretToken = process.env.jwtSecret;

const User = require("../models/User");
const {
  hashPassword,
  passwordsMatch,
  isValidUsername,
  isValidPassword,
} = require("../util/helper");

const login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!isValidUsername(username) || !isValidPassword(password)) {
    return res.status(400).json({
      message: "Invalid Login Username or Password",
      status: "Unauthorized",
    });
  }

  try {
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const match = await passwordsMatch(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials! ", status: "Unauthorized" });
    }

    const maxAge = 3 * 60 * 60;
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.isAdmin ? "admin" : "user" },
      jwtSecretToken,
      { expiresIn: maxAge }
    );

    res.cookie("token", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.cookie(
      "context",
      JSON.stringify({ name: user.name, isLoggedIn: true, isAdmin: user.isAdmin ? true : false }),
      {
        maxAge: maxAge * 1000,
      }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        username: username,
        isAdmin: user.isAdmin ? true : false,
      },
      token: !user.isAdmin ? token : null,
    });
  } catch (error) {
    console.log(error);
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
    return res.status(400).json({
      message: "Password less than 6 characters",
    });
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
    user: {
      name: user.name,
      username: username,
    },
  });
};

const logout = async (req, res, next) => {
  res.cookie("jwt", "", {
    maxAge: "1",
  });
  res.cookie("context", "", {
    maxAge: "1",
  });
  res.setHeader("Location", "http://localhost:5173/login");
  res.status(200).json();
};

module.exports = { login, register, logout }; 
