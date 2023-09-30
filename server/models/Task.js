const sequelize = require("../util/database");
const { DataTypes } = require("sequelize");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subcategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    set(value) {
      if (value === null || value === undefined) {
        this.setDataValue("points", null);
      } else {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
          this.setDataValue("points", numericValue);
        } else {
          throw new Error("Invalid numeric value");
        }
      }
    },
  },
});

module.exports = Task;
