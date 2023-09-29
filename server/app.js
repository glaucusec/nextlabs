const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { hashPassword } = require("./util/helper");

const app = express();

const User = require("./models/User");
const sequelize = require("./util/database");

const authRoutes = require("./routes/auth");
const appRoutes = require("./routes/app");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

// create Admin user if not exists?

app.use("/api/auth", authRoutes);
app.use("/api/app", appRoutes);

sequelize.sync().then(async () => {
  const adminUser = await User.findOne({ where: { isAdmin: true } });

  // If no admin user exists, create one
  if (!adminUser) {
    const hashedPassword = await hashPassword("admin");
    await User.create({
      name: "Admin",
      username: "admin",
      password: hashedPassword, // Set a secure password
      isAdmin: true,
    });
  }
  app.listen(process.env.PORT, () => {
    console.log("I am listening...");
  });
});
