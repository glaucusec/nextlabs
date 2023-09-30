const { appDetailsScraper } = require("../util/helper/scraper");
const Task = require("../models/Task");
const sequelize = require("../util/database");

const fetchCategories = async (req, res, next) => {
  const { appName, appLink } = req.body;
  try {
    const details = await appDetailsScraper(appLink);
    return res.status(200).json(details);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Cannot fetch Data! Try another App" });
  }
};

const createTask = async (req, res, next) => {
  const { appName, appLink, category, subcategory, points, imageURL } =
    req.body;
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
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const fetchTasks = async (req, res, next) => {
  const tasks = await Task.findAll({
    attributes: ["id", "name", "category", "imageURL", "points", 'link'],
  });
  res.status(200).json(tasks);
};

module.exports = { fetchCategories, createTask, fetchTasks };
