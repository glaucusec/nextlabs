const User = require("../models/User");
const Task = require("../models/Task");
const UserTask = require("../models/UserTask");

const getPoints = async (req, res, next) => {
  const userId = req.user.id;
  const points = await User.findByPk(userId, { attributes: ["totalPoints"] });
  return res.status(200).json(points);
};

const completeTask = async (req, res, next) => {
  const { TaskId } = req.body;
  const UserId = req.user.id;

  try {
    const currTask = await Task.findByPk(TaskId);
    await UserTask.create({
      UserId: UserId,
      TaskId: TaskId,
      completedStatus: true,
    });
    const totalPoints = req.user.totalPoints;
    req.user.totalPoints = totalPoints + currTask.points;
    req.user.save();

    return res
      .status(201)
      .json({ message: "Task marked as Completed. Points Awarded" });
  } catch (err) {
    console.log(err);
  }
};

const completedTasks = async (req, res, next) => {
  const userId = req.user.id;

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
};

module.exports = { getPoints, completeTask, completedTasks };
