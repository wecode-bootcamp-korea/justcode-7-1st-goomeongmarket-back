const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");

const userController = require("../controllers/userContoller");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/check", userController.doubleCheckEmail);
router.get("/info", validateToken, userController.getMe);

module.exports = router;
