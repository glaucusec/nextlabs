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
      message: "Invalid username or password",
      status: "Bad Request",
    });
  }

  try {
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(401).json({ message: "User not found", status: "Unauthorized" });
    }

    const match = await passwordsMatch(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials", status: "Unauthorized" });
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
      JSON.stringify({ name: user.name, isLoggedIn: true, isAdmin: user.isAdmin }),
      {
        maxAge: maxAge * 1000,
      }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        username: username,
        isAdmin: user.isAdmin,
      },
      token: !user.isAdmin ? token : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
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
      message: "Password must be at least 6 characters long",
      status: "Bad Request",
    });
  }

  const hashedPassword = await hashPassword(password);

  try {
    const user = await User.create({
      name: name,
      username: username,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: "User successfully created",
      user: {
        name: user.name,
        username: username,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "User creation failed",
      error: error.message,
    });
  }
};

const logout = async (req, res, next) => {
  res.clearCookie("token");
  res.clearCookie("context");
  res.setHeader("Location", `${process.env.CLIENT_URL}/login`);
  res.status(200).json({
    message: "Logout successful",
  });
};

module.exports = { login, register, logout };
