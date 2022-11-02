const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/signup", userController.signup);
// router.post("/login", userController.login);
// router.get("/getuser", userController.getuser);
// router.patch("/updateuser", userController.updateuser);
// router.delete("/deleteuser", userController.deleteuser);
module.exports = {
  userController,
};
