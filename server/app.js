const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { hashPassword } = require("./util/helper");

const app = express();

const User = require("./models/User");
const Task = require("./models/Task");
const UserTask = require("./models/UserTask");

const sequelize = require("./util/database");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const appRoutes = require("./routes/app");

const dailyWorker = require('./worker/dailyWorker')

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/app", appRoutes);

sequelize.sync().then(async () => {
  const adminUser = await User.findOne({ where: { isAdmin: true } });

  // If no admin user exists, create one
  if (!adminUser) {
    const hashedPassword = await hashPassword("admin");
    await User.create({
      name: "Admin",
      username: "admin",
      password: hashedPassword,
      isAdmin: true,
    });
  }
  app.listen(process.env.PORT, () => {
    console.log("I am listening...");
  });
});
