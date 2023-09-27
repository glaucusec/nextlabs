const express = require("express");
require("dotenv").config();

const app = express();
const sequelize = require("./util/database");

const AuthRoutes = require("./routes/auth");

app.use("/auth", AuthRoutes);

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("I am listening...");
  });
});
