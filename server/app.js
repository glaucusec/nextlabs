const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const User = require("./models/User");
const sequelize = require("./util/database");

const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Update this with your React app's URL
    credentials: true, // Allow credentials (cookies, in this case)
  })
);

// create Admin user if not exists?

app.use("/api/auth", authRoutes);

sequelize.sync({ force: true }).then(async () => {
  const adminUser = await User.findOne({ where: { isAdmin: true } });

  // If no admin user exists, create one
  if (!adminUser) {
    await User.create({
      name: 'Admin',
      username: "admin",
      password: "admin", // Set a secure password
      isAdmin: true,
    });
  }
  app.listen(process.env.PORT, () => {
    console.log("I am listening...");
  });
});
