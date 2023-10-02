const User = require("../models/User");
const Task = require("../models/Task");
const UserTask = require("../models/UserTask");

const getPoints = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await User.findByPk(userId, { attributes: ["totalPoints"] });
    if (!user) {
      return res.status(404).json({ message: "User not found", status: "Not Found" });
    }
    return res.status(200).json({ totalPoints: user.totalPoints });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error! Try again later", status: "Internal Server Error" });
  }
};

const completeTask = async (req, res, next) => {
  const { TaskId } = req.body;
  const UserId = req.user.id;

  try {
    const currTask = await Task.findByPk(TaskId);
    if (!currTask) {
      return res.status(404).json({ message: "Task not found", status: "Not Found" });
    }

    await UserTask.create({
      UserId: UserId,
      TaskId: TaskId,
      completedStatus: true,
    });

    const user = req.user;
    user.totalPoints += currTask.points;
    await user.save();

    return res.status(201).json({ message: "Task marked as Completed. Points Awarded" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error! Try again later", status: "Internal Server Error" });
  }
};

const completedTasks = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const taskCompleted = await UserTask.findAll({
      where: { UserId: userId, completedStatus: true },
      attributes: ["TaskId"],
    });

    const taskIds = taskCompleted.map((item) => item.TaskId);

    const taskDetails = await Task.findAll({
      where: { id: taskIds },
      attributes: ["id", "name", "imageURL", "points"],
    });

    return res.status(200).json(taskDetails);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error! Try again later", status: "Internal Server Error" });
  }
};

const fetchTask = async (req, res, next) => {
  let id = req.params.id;
  id = parseInt(id);
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID provided", status: "Bad Request" });
  }

  try {
    const task = await Task.findByPk(id, { attributes: { exclude: ["createdAt", "updatedAt"] } });
    if (!task) {
      return res.status(404).json({ message: "Task not found", status: "Not Found" });
    }
    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error! Try again later", status: "Internal Server Error" });
  }
};

module.exports = { getPoints, completeTask, completedTasks, fetchTask };
