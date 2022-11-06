const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");

const userController = require("../controllers/userContoller");

router.post("/account", userController.signup);
router.post("/account1", userController.login);
// router.get("/account", validateToken, userController.getuser); 순서대로 실행
// router.patch("/account", validateToken, userController.update);
// router.delete("/account", validateToken, userController.delete);

module.exports = router;
