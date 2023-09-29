const express = require("express");

const router = express.Router();

const appController = require("../controllers/appController");

router.post("/fetch", appController.fetchAppDetails);

router.post("/add", appController.addApp);

// router.get("/logout", authController.logout);

module.exports = router;
