const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");
const adminAuthController = require("../middleware/adminAuth");

router.post(
  "/fetchCategories",
  adminAuthController.adminAuth,
  adminController.fetchCategories
);

router.post(
  "/fetchTasks",
  adminController.fetchTasks
);

router.post(
  "/createTask",
  adminAuthController.adminAuth,
  adminController.createTask
);

// router.get("/logout", authController.logout);

module.exports = router;
