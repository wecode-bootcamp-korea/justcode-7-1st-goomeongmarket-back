const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");

const userController = require("../controllers/userContoller");

router.post("/account", userController.signup);
router.post("/account1", userController.login);
router.post("/account2", userController.doubleCheckEmail);
router.get("/info", validateToken, userController.getMe);

module.exports = router;
