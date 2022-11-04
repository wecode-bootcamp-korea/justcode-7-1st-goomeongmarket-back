const express = require("express");
const router = express.Router();

const userController = require("../controllers/userContoller");

router.post("/signup", userController.signup);
// router.post("/login", userController.login);
// router.get("/getuser", userController.getuser);
// router.patch("/updateuser", userController.updateuser);
// router.delete("/deleteuser", userController.deleteuser);

module.exports = router;
