const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");

const userController = require("../controllers/userContoller");

router.post("/account", userController.signup);
router.post("/account1", userController.login);

module.exports = router;
