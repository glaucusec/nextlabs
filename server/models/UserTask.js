const { DataTypes } = require("sequelize");

const sequelize = require("../util/database");
const User = require("../models/User");
const Task = require("../models/Task");

const UserTask = sequelize.define("UserTask", {
  UserId: {
    type: DataTypes.STRING,
  },
  TaskId: {
    type: DataTypes.STRING,
  },
  completedStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = UserTask;
