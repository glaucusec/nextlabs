const { appDetailsScraper } = require("../util/scraper");
const Task = require("../models/Task");
const sequelize = require("../util/database");

const fetchCategories = async (req, res, next) => {
  const { appName, appLink } = req.body;
  try {
    const details = await appDetailsScraper(appLink);
    return res.status(200).json(details);
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ message: "Unable to fetch data. Please try another app.", status: "Bad Request" });
  }
};

const createTask = async (req, res, next) => {
  const { appName, appLink, category, subcategory, points, imageURL } = req.body;
  try {
    await Task.create({
      name: appName,
      link: appLink,
      category: category,
      subcategory: subcategory,
      imageURL: imageURL,
      points: points,
    });
    res.status(201).json({ message: "Task Created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", status: "Internal Server Error" });
  }
};

const fetchTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      attributes: ["id", "name", "category", "imageURL", "points", "link"],
    });
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", status: "Internal Server Error" });
  }
};

module.exports = { fetchCategories, createTask, fetchTasks };
