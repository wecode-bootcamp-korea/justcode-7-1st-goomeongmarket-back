const express = require("express");
const router = express.Router();
// TODO 5 - 사용되지 않는 middleware 제거
const validateToken = require("../middlewares/validateToken");

const userController = require("../controllers/userContoller");

// TODO 4 - signUp, login, email -> RESTful API rule 적용
router.post("/account", userController.signup);
router.post("/account1", userController.login);
router.post("/account2", userController.doubleCheckEmail);

module.exports = router;
