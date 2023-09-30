const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads" });
const router = express.Router();

const appController = require("../controllers/appController");
const userAuthController = require("../middleware/userAuth");

router.post("/points", userAuthController.userAuth, appController.getPoints);

const handleError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.log("Error @app.js[route] >>>>", err.message);
    return res.status(400).json({ message: "File Upload Failed. Try Later " });
  } else {
    next();
  }
};

router.post(
  "/completeTask",
  userAuthController.userAuth,
  upload.single("file"),
  handleError,
  appController.completeTask
);

router.post(
  "/completedTasks",
  userAuthController.userAuth,
  appController.completedTasks
);

module.exports = router;
