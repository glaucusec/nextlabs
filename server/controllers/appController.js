const User = require("../models/User");
const Task = require("../models/Task");
const UserTask = require("../models/UserTask");

const getPoints = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const points = await User.findByPk(userId, { attributes: ["totalPoints"] });
    return res.status(200).json(points);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error! Try again Later" });
  }
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
    return res
      .status(500)
      .json({ message: "Internal Server Error! Try again later" });
  }
};

const completedTasks = async (req, res, next) => {
  const userId = req.user.id;
  try {
    // find the taskId of the completed tasks.
    const taskCompleted = await UserTask.findAll({
      where: { UserId: userId, completedStatus: true },
      attributes: ["TaskId"],
    });

    const taskIds = taskCompleted.map((item) => item.TaskId);
    // find the detailed task info
    const taskDetails = await Task.findAll({
      where: { id: taskIds },
      attributes: ["id", "name", "imageURL", "points"],
    });

    return res.status(200).json(taskDetails);
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ message: "Internal Server Error! Try again later" });
  }
};

module.exports = { getPoints, completeTask, completedTasks };
