const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads" });
const router = express.Router();

const adminController = require("../controllers/adminController");

const appController = require("../controllers/appController");
const userAuthController = require("../middleware/userAuth");

// this function handles the possible multer error.
const handleError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.log("Error @app.js[route] >>>>", err.message);
    return res.status(400).json({ message: "File Upload Failed. Try Later " });
  } else {
    next();
  }
};

router.post("/points", userAuthController.userAuth, appController.getPoints);

router.post(
  "/completeTask",
  userAuthController.userAuth,
  upload.single("file"),
  handleError,
  appController.completeTask
);

router.post("/completedTasks", userAuthController.userAuth, appController.completedTasks);

router.post("/fetchTasks", userAuthController.userAuth, adminController.fetchTasks);

router.get("/fetchTask/:id", userAuthController.userAuth, appController.fetchTask);

module.exports = router;
